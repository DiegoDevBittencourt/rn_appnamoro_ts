import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as RootNavigationRef from '@routes/RootNavigationRef';
import api from '@utils/api';
import { decodeJwtToken } from '~/utils/functions';
import { updateUserDataOnRedux } from '../users/reducer';
import { isCheckingIfTokenHasExpiredStatus, signInAction, signOutAction, signUpAction, updateAccessTokenOnRedux } from '@store/auth/reducer';
import { showLoader } from '../utils/reducer';
import { getUserData } from '../users/thunk';
import { DASHBOARD_SCREEN, LOGIN_SCREEN } from '~/constants/screenNames';
import { handleThunkError } from '../error/thunk';
import { updateMatchedProfilesArray } from '../match/reducer';
import { cleanMatchSearcherArrayAndGetNextProfile } from '../match/thunk';
import { formatUserToApi } from '~/utils/formatters';
import { updateRealTimeMongodbChat } from '../mongodb/reducer';

export function signInLocal(userData: any) {
    return async (dispatch: any) => {
        try {

            dispatch(updateRealTimeMongodbChat([]));
            dispatch(showLoader(true));

            const res = await api.post('account/signin', userData);

            const userId = decodeJwtToken(res?.data?.token)?.id;

            dispatch(setAccessTokenOnStorageAndRedux(res?.data?.token));
            dispatch(updateUserDataOnRedux({ id: userId }));

            await AsyncStorage.setItem('@userId', userId);

            dispatch(showLoader(false));

            Keyboard.dismiss();

            dispatch(signInAction());
            dispatch(getUserData({
                shouldGetAddress: true,
                shouldGetProfilesForMatchSearcher: true,
                shouldGetMatchedProfiles: true
            }));

            RootNavigationRef.reset(DASHBOARD_SCREEN);

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function signUp(userData?: any) {
    return async (dispatch: any) => {

        try {
            dispatch(showLoader(true));

            const res = await api.post('account/signup', formatUserToApi(userData));

            RootNavigationRef.goBack();

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

            const userId = decodeJwtToken(res.data.token)?.id;
            dispatch(updateUserDataOnRedux({ id: userId }));

            dispatch(signUpAction());
            dispatch(getUserData({
                shouldGetAddress: true,
                shouldGetProfilesForMatchSearcher: true,
                shouldGetMatchedProfiles: true
            }));

            dispatch(showLoader(false));

            RootNavigationRef.reset(DASHBOARD_SCREEN);

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function setAccessTokenOnStorageAndRedux(accessToken: string) {
    return async (dispatch: any) => {
        await AsyncStorage.setItem('@accessToken', accessToken || '');
        dispatch(updateAccessTokenOnRedux(accessToken));
    }
}

export function signOut() {
    return async (dispatch: any) => {
        try {
            await AsyncStorage.setItem('@accessToken', '');

            dispatch(cleanMatchSearcherArrayAndGetNextProfile(false));
            dispatch(updateMatchedProfilesArray([]));

            dispatch(setAccessTokenOnStorageAndRedux(''));
            dispatch(signOutAction());

            dispatch(showLoader(false));

            //if the user logout while something didn't finished yet, errorThunk.handleThunkError and then signOut() will be called
            //this will make RootNavigationRef.reset(LOGIN_SCREEN) be read more than once, wich will create a non desirable effect
            //on Login screen "recreating" it many times

            if (RootNavigationRef.getCurrentRoutName() != LOGIN_SCREEN) {
                RootNavigationRef.goBack();
                RootNavigationRef.reset(LOGIN_SCREEN);
            }

        } catch (err) {
            dispatch(handleThunkError(err));
            dispatch(setAccessTokenOnStorageAndRedux(''));
        }
    }
}

export function checkIfTokenHasExpired() {
    return async (dispatch: any, getState: any) => {
        try {

            dispatch(isCheckingIfTokenHasExpiredStatus(true));

            const accessToken = getState().auth.accessToken;

            if (accessToken) {

                await api.post('account/check_if_token_has_expired', {});

                dispatch(isCheckingIfTokenHasExpiredStatus(false));

                dispatch(getUserData({
                    shouldGetAddress: true,
                    shouldGetProfilesForMatchSearcher: true,
                    shouldGetMatchedProfiles: true
                }));

            } else {
                dispatch(isCheckingIfTokenHasExpiredStatus(false));
                dispatch(signOut());
            }

        } catch (err) {
            dispatch(isCheckingIfTokenHasExpiredStatus(false));
            dispatch(handleThunkError(err));
        }
    }
}

export function signInOauth(oauthAccessToken?: string, type?: string) {
    return async (dispatch: any) => {

        try {

            dispatch(showLoader(true));

            let res;

            switch (type) {
                case 'facebook':
                    res = await api.post('account/facebook', { access_token: oauthAccessToken });
                    break;
                default:
                    res = await api.post('account/google', { access_token: oauthAccessToken });
                    break;
            }

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

            dispatch(updateUserDataOnRedux({ id: decodeJwtToken(res.data.token).id }));

            dispatch(showLoader(false));

            Keyboard.dismiss();

            dispatch(signInAction());

            dispatch(getUserData({
                shouldGetAddress: true,
                shouldGetProfilesForMatchSearcher: true,
                shouldGetMatchedProfiles: true
            }));

            RootNavigationRef.reset(DASHBOARD_SCREEN);

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

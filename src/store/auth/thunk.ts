import { Keyboard } from 'react-native';
// import firebase from "firebase";
import AsyncStorage from '@react-native-community/async-storage';

import * as RootNavigationRef from '@routes/RootNavigationRef';
import api from '@utils/api';
import { decodeJwtToken } from '~/utils/functions';
import { updateUserDataOnRedux } from '../users/reducer';
import { signInAction, signUpAction, updateAccessTokenOnRedux } from '@store/auth/reducer';
import { showLoader } from '../utils/reducer';
import { getUserData } from '../users/thunk';
import { DASHBOARD_SCREEN } from '~/constants/screenNames';
import { handleThunkError } from '../error/thunk';

const unsubscribeFirebaseListeners: any[] = [];

export function signInLocal(userData: any) {
    return async (dispatch: any) => {
        try {

            dispatch(showLoader(true));

            const res = await api.post('account/signin', userData);

            dispatch(setAccessTokenOnStorageAndRedux(res?.data?.token));
            dispatch(updateUserDataOnRedux({ id: decodeJwtToken(res?.data?.token)?.id }));

            dispatch(showLoader(false));

            Keyboard.dismiss();

            dispatch(signInAction());
            dispatch(getUserData({
                shouldGetAddress: true,
                shouldGetProfilesForMatchSearcher: true,
                shouldSignInOnFirebase: true,
                shouldGetMatchedProfiles: true
            }));

            RootNavigationRef.reset(DASHBOARD_SCREEN);

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function setAccessTokenOnStorageAndRedux(accessToken: string) {
    return async (dispatch: any) => {
        AsyncStorage.setItem('accessToken', accessToken || '');
        dispatch(updateAccessTokenOnRedux(accessToken));
    }
}

export function signOut() {
    return async (dispatch: any) => {
        try {
            unsubscribeFirebaseListeners.map(item => item());

            await AsyncStorage.setItem('accessToken', '');

            // firebase.auth().signOut();

            // dispatch(matchThunk.cleanMatchSearcherArrayAndGetNextProfile(false));
            // dispatch(matchActions.updateMatchedProfilesArray([]));

            // dispatch(setAccessTokenOnStorageAndRedux(''));
            // dispatch(authActions.signOutAction());

            // dispatch(utilsActions.showLoader(false));

            // //if the user logout while something didn't finished yet, errorThunk.handleThunkError and then signOut() will be called
            // //this will make RootNavigationRef.reset(LOGIN_SCREEN) be read more than once, wich will create a non desirable effect
            // //on Login screen "recreating" it many times
            // RootNavigationRef.getCurrentRoutName() != LOGIN_SCREEN && RootNavigationRef.reset(LOGIN_SCREEN);

        } catch (err) {
            // dispatch(errorThunk.handleThunkError(err));
            dispatch(setAccessTokenOnStorageAndRedux(''));
        }
    }
}

export function signUp(userData?: any) {
    return async (dispatch: any) => {

        try {
            dispatch(showLoader(true));

            const res = await api.post('account/signup', userData);

            RootNavigationRef.goBack();

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

            dispatch(signUpAction());

            dispatch(showLoader(false));

            RootNavigationRef.reset('Dashboard');

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

// export function checkIfTokenHasExpired() {
//     return async (dispatch, getState) => {
//         try {

//             dispatch(authActions.isCheckingIfTokenHasExpiredStatus(true));

//             const accessToken = getState().auth.accessToken;

//             if (accessToken) {

//                 await api.post('account/check_if_token_has_expired', {});

//                 dispatch(authActions.isCheckingIfTokenHasExpiredStatus(false));

//                 dispatch(userThunk.getUserData(true, true, true, true));

//             } else {
//                 dispatch(authActions.isCheckingIfTokenHasExpiredStatus(false));
//                 dispatch(signOut());
//             }

//         } catch (err) {
//             dispatch(authActions.isCheckingIfTokenHasExpiredStatus(false));
//             dispatch(errorThunk.handleThunkError(err));
//         }
//     }
// }

// export function signInOauth(oauthAccessToken, type) {
//     return async (dispatch:any) => {

//         try {

//             dispatch(utilsActions.showLoader(true));

//             let res;

//             switch (type) {
//                 case 'facebook':
//                     res = await api.post('account/facebook', { access_token: oauthAccessToken });
//                     break;
//                 default:
//                     res = await api.post('account/google', { access_token: oauthAccessToken });
//                     break;
//             }

//             dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

//             dispatch(userActions.updateUserDataOnRedux({ id: decodeJwtToken(res.data.token).id }));

//             dispatch(utilsActions.showLoader(false));

//             Keyboard.dismiss();

//             dispatch(authActions.signInAction());

//             dispatch(userThunk.getUserData(true, true, true, true));

//             RootNavigationRef.reset('Dashboard');

//         } catch (err) {
//             dispatch(errorThunk.handleThunkError(err));
//         }
//     }
// }

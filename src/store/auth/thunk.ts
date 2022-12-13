import { Keyboard } from 'react-native';
// import firebase from "firebase/compat/app";
// import firebase from "firebase";
import AsyncStorage from '@react-native-community/async-storage';

import api from '@utils/api';
import * as RootNavigationRef from '@routes/RootNavigationRef';
// import * as errorThunk from '@store/error/thunk';
// import * as userThunk from '@store/user/thunk';
// import * as matchActions from '@store/match/actions';
// import * as matchThunk from '@store/match/thunk';
// import { LOGIN_SCREEN } from '~/constants/screenNames';
import { decodeJwtToken } from '~/utils/functions';
import { updateUserDataOnRedux } from '../users/reducer';
import { signInAction, updateAccessTokenOnRedux } from '@store/auth/reducer';
import { showLoader } from '../utils/reducer';
import { getUserData } from '../users/thunk';

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

            // RootNavigationRef.reset('Dashboard');

        } catch (err) {
            // dispatch(errorThunk.handleThunkError(err));
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

// export function signUp(userData, navigation) {
//     return async (dispatch:any) => {

//         try {

//             dispatch(utilsActions.showLoader(true));

//             const res = await api.post('account/signup', userData);

//             navigation.goBack();

//             dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

//             dispatch(authActions.signUpAction());

//             dispatch(utilsActions.showLoader(false));

//             RootNavigationRef.reset('Dashboard');

//         } catch (err) {
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

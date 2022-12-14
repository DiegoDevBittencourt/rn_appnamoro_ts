import * as RootNavigationRef from '@routes/RootNavigationRef';
// import * as userActions from './actions';
// import * as errorThunk from '@store/error/thunk';
// import * as utilsThunk from '@store/utils/thunk';
// import * as matchThunk from '@store/match/thunk';
// import * as firebaseThunk from '@store/firebase/thunk';
import api from '@utils/api';
import { COMPLETE_YOUR_PROFILE_MODAL } from '~/constants/screenNames';
// import { COMPLETE_YOUR_PROFILE_MODAL } from '~/constants/screenNames';
import {
    calculateAge,
    getSearchingByDesc,
    getSchoolingDesc,
    getGenderDesc
} from '~/utils/functions';
import { signInOrSignUpToFirebase } from '../firebase/thunk';
import { getAddress } from '../utils/thunk';
import { updateUserDataOnRedux } from './reducer';

export function getUserData({
    shouldGetAddress,
    shouldGetProfilesForMatchSearcher,
    shouldSignInOnFirebase,
    shouldGetMatchedProfiles
}: {
    shouldGetAddress: boolean,
    shouldGetProfilesForMatchSearcher: boolean,
    shouldSignInOnFirebase: boolean,
    shouldGetMatchedProfiles: boolean
}) {

    return async (dispatch: any, getState: any) => {

        const userState = getState().users;

        try {

            const res = await api.get(`users/get_user/${userState.userData?.id}`, {});

            const userData = res.data;

            //handling userData fields to be correctly "read" by the app
            const ageRange = userData?.ageRange.split(',');
            userData.ageRange = ageRange.map((item: any) => parseInt(item));
            userData.schooling = { key: userData?.schooling || 0, label: getSchoolingDesc(userData?.schooling || 0) };
            userData.gender = { key: userData?.gender || 0, label: getGenderDesc(userData?.gender || 0) };
            userData.searchingBy = { key: userData?.searchingBy || 1, label: getSearchingByDesc(userData?.searchingBy || 1) };
            userData.birthday = new Date(userData?.birthday);//needed to work properly on datePicker
            userData.age = calculateAge(userData?.birthday);
            userData.showMeOnApp = userData?.showMeOnApp == 1;
            userData.emailNotification = userData?.emailNotification == 1;
            userData.pushNotification = userData?.pushNotification == 1;

            userData?.userImages.map((item: any) => {
                item.progress = 0;
                item.uploaded = true;
                item.error = false;
            });

            dispatch(updateUserDataOnRedux(userData));

            !userData?.profileComplete && RootNavigationRef.push(COMPLETE_YOUR_PROFILE_MODAL);

            shouldGetAddress && dispatch(getAddress());

            shouldSignInOnFirebase && dispatch(signInOrSignUpToFirebase());

            shouldGetMatchedProfiles && dispatch(matchThunk.getMatchedProfiles());

            // shouldGetProfilesForMatchSearcher && dispatch(matchThunk.getNextProfileForTheMatchSearcher());

        } catch (err) {
            // dispatch(errorThunk.handleThunkError(err));
        }
    }
}

// export function updateUser(user, shouldShowLoader, shouldCleanMatchSearcherArrayAndGetNextProfile) {
//     return async (dispatch, getState) => {

//         const userState = getState().user;

//         try {

//             shouldShowLoader && dispatch(utilsActions.showLoader(true));

//             user = { ...user, id: userState.userData?.id };

//             await api.post('users/update_user', { user });

//             const userData = user.ageRange ? {
//                 ageRange: [
//                     parseInt(user.ageRange.split(',')[0]),
//                     parseInt(user.ageRange.split(',')[1])
//                 ]
//             } : user;

//             dispatch(userActions.updateUserDataOnRedux(userData));

//             shouldCleanMatchSearcherArrayAndGetNextProfile && dispatch(matchThunk.cleanMatchSearcherArrayAndGetNextProfile(true));

//             dispatch(utilsActions.showLoader(false));

//         } catch (err) {
//             dispatch(errorThunk.handleThunkError(err));
//         }
//     }
// }

// export function deleteUserImage(imageId) {
//     return async (dispatch) => {
//         try {

//             dispatch(utilsActions.showLoader(true));

//             await api.delete(`users/user_images/${imageId}`);

//             dispatch(utilsActions.showLoader(false));
//             dispatch(getUserData(true));

//             RootNavigationRef.goBack();

//         } catch (err) {
//             dispatch(errorThunk.handleThunkError(err));
//         }
//     }
// }

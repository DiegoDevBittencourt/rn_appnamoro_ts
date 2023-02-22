import * as RootNavigationRef from '@routes/RootNavigationRef';
import api from '@utils/api';
import { COMPLETE_YOUR_PROFILE_MODAL } from '~/constants/screenNames';
import { getAddress } from '../utils/thunk';
import { updateUserDataOnRedux, UserImage } from './reducer';
import {
    calculateAge,
    getSearchingDesc,
    getSchoolingDesc,
    getGenderDesc,
} from '~/utils/functions';
import { cleanMatchSearcherArrayAndGetNextProfile, getMatchedProfiles, getNextProfileForTheMatchSearcher } from '../match/thunk';
import { handleThunkError } from '../error/thunk';
import { showLoader } from '../utils/reducer';
import { formatUserToApi } from '~/utils/formatters';
import AsyncStorage from '@react-native-community/async-storage';

export function getUserData({
    shouldGetAddress,
    shouldGetProfilesForMatchSearcher,
    shouldGetMatchedProfiles
}: {
    shouldGetAddress?: boolean,
    shouldGetProfilesForMatchSearcher?: boolean,
    shouldGetMatchedProfiles?: boolean
}) {
    return async (dispatch: any, getState: any) => {

        const userState = getState().users;

        try {

            const res = await api.get(`users/get_user/${userState?.userData?.id}`, {});

            const userData = res?.data;
            await AsyncStorage.setItem('@userId', String(userData?.id));

            //handling userData fields to be correctly "read" by the app
            const ageRange = userData?.ageRange.split(',');
            userData.ageRange = ageRange.map((item: string) => parseInt(item));
            userData.schooling = { key: userData?.schooling || 0, label: getSchoolingDesc(userData?.schooling || 0) };
            userData.gender = { key: userData?.gender || 0, label: getGenderDesc(userData?.gender || 0) };
            userData.searchingBy = { key: userData?.searchingBy || 1, label: getSearchingDesc(userData?.searchingBy || 1) };
            userData.birthday = new Date(userData?.birthday);//needed to work properly on datePicker
            userData.age = calculateAge(userData?.birthday);
            userData.showMeOnApp = userData?.showMeOnApp == 1;
            userData.emailNotification = userData?.emailNotification == 1;
            userData.pushNotification = userData?.pushNotification == 1;

            userData?.userImages.map((item: UserImage) => {
                item.progress = 0;
                item.uploaded = true;
                item.error = false;
            });

            dispatch(updateUserDataOnRedux(userData));

            !userData?.profileComplete && RootNavigationRef.push(COMPLETE_YOUR_PROFILE_MODAL);

            shouldGetAddress && dispatch(getAddress());

            shouldGetMatchedProfiles && dispatch(getMatchedProfiles());

            shouldGetProfilesForMatchSearcher && dispatch(getNextProfileForTheMatchSearcher());

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function updateUser({
    user,
    shouldShowLoader,
    shouldCleanMatchSearcherArrayAndGetNextProfile
}: {
    user?: any,
    shouldShowLoader?: boolean,
    shouldCleanMatchSearcherArrayAndGetNextProfile?: boolean
}) {

    return async (dispatch: any, getState: any) => {

        const userState = getState().users;

        try {
            shouldShowLoader && dispatch(showLoader(true));

            user = { ...user, id: userState?.userData?.id };

            await api.post('users/update_user', { user: formatUserToApi(user) });

            if (user?.ageRange) {
                user.ageRange = [
                    parseInt(user?.ageRange?.split(',')[0]),
                    parseInt(user?.ageRange?.split(',')[1])
                ];
            }

            dispatch(updateUserDataOnRedux(user));

            shouldCleanMatchSearcherArrayAndGetNextProfile && dispatch(cleanMatchSearcherArrayAndGetNextProfile(true));

            dispatch(showLoader(false));

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function deleteUserImage(imageId: string) {
    return async (dispatch: any) => {
        try {

            dispatch(showLoader(true));

            await api.delete(`users/user_images/${imageId}`);

            dispatch(showLoader(false));
            dispatch(getUserData({ shouldGetAddress: true }));

            RootNavigationRef.goBack();

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

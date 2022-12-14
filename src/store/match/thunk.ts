import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigationRef from '@routes/RootNavigationRef';
import api from '~/utils/api';
import { calculateAge, calculateDistanceFromLatLonInKm } from '~/utils/functions';
import { handleThunkError } from '../error/thunk';
import { removeAllConversationsFromThisMatch } from '../firebase/thunk';
import { updateUserDataOnRedux, UserDataType } from '../users/reducer';
import { getUserData } from '../users/thunk';
import { showLoader } from '../utils/reducer';
import {
    addProfileIntoMatchSearcherArray,
    removeAllIdsFromProfileIdsAlreadyDownloaded,
    removeProfileFromMatchSearcher,
    updateIsGettingProfileForTheMatchSearcher,
    updateMatchedProfilesArray,
    updateProfileIdsAlreadyDownloaded
} from './reducer';

export function ignoreCurrentProfile(profileId: string) {
    return (dispatch: any) => {
        dispatch(removeProfileFromMatchSearcher({ profileId }));
        dispatch(getNextProfileForTheMatchSearcher());
    }
}

export function likeCurrentProfile(profile: UserDataType, superLike: boolean) {
    return (dispatch: any) => {
        superLike && dispatch(updateUserDataOnRedux({ lastTimeSuperLikeWasUsed: new Date() }));
        dispatch(removeProfileFromMatchSearcher({ profileId: profile.id }));
        dispatch(getNextProfileForTheMatchSearcher());
    }
}

export function getNextProfileForTheMatchSearcher() {
    return async (dispatch: any, getState: any) => {

        const { isGettingProfileForTheMatchSearcher, profileIdsAlreadyDownloaded, matchSearcherProfiles } = getState().match;
        const { userData } = getState().users;
        const { isGeolocationEnabled } = getState().utils;

        const currentLongitude = await AsyncStorage.getItem('currentLongitude');
        const currentLatitude = await AsyncStorage.getItem('currentLatitude');
        console.log('currentLongitude222', currentLongitude)
        try {
            if (!isGettingProfileForTheMatchSearcher && matchSearcherProfiles?.length < 2 && isGeolocationEnabled) {

                dispatch(updateIsGettingProfileForTheMatchSearcher(true));

                const res = await api.post('users/get_profile_to_the_match_searcher', {
                    currentLongitude: userData.currentLongitude || currentLongitude,
                    currentLatitude: userData.currentLatitude || currentLatitude,
                    maxDistance: userData.maxDistance,
                    userId: userData.id,
                    searchingBy: userData.searchingBy.key,
                    profileIdsAlreadyDownloaded: profileIdsAlreadyDownloaded,
                    ageRange: userData.ageRange
                });
                console.log('wwwwww', {
                    currentLongitude: userData.currentLongitude || currentLongitude,
                    currentLatitude: userData.currentLatitude || currentLatitude,
                    maxDistance: userData.maxDistance,
                    userId: userData.id,
                    searchingBy: userData.searchingBy.key,
                    profileIdsAlreadyDownloaded: profileIdsAlreadyDownloaded,
                    ageRange: userData.ageRange
                })

                if (res?.data?.user) {
                    res.data.user.distance = parseInt(String(calculateDistanceFromLatLonInKm({
                        lat1: userData.currentLongitude,
                        lon1: userData.currentLatitude,
                        lat2: res.data.user.lastLongitude,
                        lon2: res.data.user.lastLatitude
                    })));

                    res.data.user.age = calculateAge(new Date(res.data.user.birthday));

                    dispatch(addProfileIntoMatchSearcherArray(res.data.user));

                    dispatch(updateProfileIdsAlreadyDownloaded(res.data.user.id));

                    dispatch(updateIsGettingProfileForTheMatchSearcher(false));

                    /*matchSearcherProfiles must have at least 2 profiles, so when user likes/ignores the first one, the second will appear*/
                    matchSearcherProfiles.length < 2 && dispatch(getNextProfileForTheMatchSearcher());
                }
                else
                    dispatch(updateIsGettingProfileForTheMatchSearcher(false));
            }
            else
                dispatch(updateIsGettingProfileForTheMatchSearcher(false));

        } catch (err) {
            dispatch(updateIsGettingProfileForTheMatchSearcher(false));
            dispatch(handleThunkError(err));
        }
    }
}

export function getMatchedProfiles() {
    return async (dispatch: any, getState: any) => {
        //get only profiles that was already matched with current user

        const userState = getState().users;

        try {
            const res = await api.get(`users/get_match_profiles/${userState.userData.id}`, {});

            res?.data?.map((item: any) => {
                item.age = calculateAge(new Date(item.birthday))
                item.distance = parseInt(String(calculateDistanceFromLatLonInKm({
                    lat1: userState.userData.currentLongitude,
                    lon1: userState.userData.currentLatitude,
                    lat2: item.lastLongitude,
                    lon2: item.lastLatitude
                })))
            });

            dispatch(updateMatchedProfilesArray(res?.data));

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function cleanMatchSearcherArrayAndGetNextProfile(shouldGetProfilesForMatchSearcher: boolean) {
    return (dispatch: any) => {
        dispatch(removeAllIdsFromProfileIdsAlreadyDownloaded());
        dispatch(removeProfileFromMatchSearcher({ removeAll: true }));

        shouldGetProfilesForMatchSearcher && dispatch(getNextProfileForTheMatchSearcher());
    }
}

export function unmatch(profileId: string) {
    return async (dispatch: any, getState: any) => {

        const userState = getState().users;

        try {

            dispatch(showLoader(true));

            await api.post('users/unmatch', { userId: userState.userData.id, profileId });

            await dispatch(removeAllConversationsFromThisMatch(profileId));

            dispatch(showLoader(false));

            dispatch(getUserData({
                shouldGetAddress: true,
                shouldGetProfilesForMatchSearcher: true,
                shouldSignInOnFirebase: false,
                shouldGetMatchedProfiles: true
            }));

            RootNavigationRef.goBack();//hides yesNo modal
            RootNavigationRef.goBack();//hides chat screen modal

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

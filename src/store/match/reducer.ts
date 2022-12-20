import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataType } from '../users/reducer';

interface MatchStoreType {
    isGettingProfileForTheMatchSearcher: boolean | null,
    availableProfilesToMatch: any[],
    matchedProfiles: any[],
    profileIdsAlreadyDownloaded: any[],
    isSuperLikeAvailable: boolean,
    currentMatchedProfile: UserDataType
}

const INITIAL_STATE: MatchStoreType = {
    isGettingProfileForTheMatchSearcher: true,
    availableProfilesToMatch: [],
    matchedProfiles: [],
    profileIdsAlreadyDownloaded: [],
    isSuperLikeAvailable: false,
    currentMatchedProfile: {}
}

const sliceMatch = createSlice({
    name: 'match',
    initialState: INITIAL_STATE,
    reducers: {
        updateMatchedProfilesArray(state, { payload }: PayloadAction<any[]>) {
            return { ...state, matchedProfiles: payload }
        },
        updateIsGettingProfileForTheMatchSearcher(state, { payload }: PayloadAction<boolean | null>) {
            return { ...state, isGettingProfileForTheMatchSearcher: payload }
        },
        updateProfileIdsAlreadyDownloaded(state, { payload }: PayloadAction<any[]>) {
            return { ...state, profileIdsAlreadyDownloaded: [...state.profileIdsAlreadyDownloaded, payload] }
        },
        addProfileIntoMatchSearcherArray(state, { payload }: PayloadAction<any[]>) {
            return { ...state, availableProfilesToMatch: [...state.availableProfilesToMatch, payload] }
        },
        updateIsSuperLikeAvailable(state, { payload }: PayloadAction<boolean>) {
            return { ...state, isSuperLikeAvailable: payload }
        },
        removeAllIdsFromProfileIdsAlreadyDownloaded(state) {
            return { ...state, profileIdsAlreadyDownloaded: [] }
        },
        removeProfileFromMatchSearcher(state, { payload }: PayloadAction<{ removeAll?: boolean, profileId?: string }>) {
            return {
                ...state, availableProfilesToMatch:
                    payload.removeAll ? [] :
                        state.availableProfilesToMatch.filter(item => item.id !== payload.profileId)
            }
        },
        setCurrentMatchedProfile(state, { payload }: PayloadAction<UserDataType>) {
            return { ...state, currentMatchedProfile: payload }
        },
    }
});

export default sliceMatch.reducer;
export const {
    updateMatchedProfilesArray,
    updateIsGettingProfileForTheMatchSearcher,
    updateProfileIdsAlreadyDownloaded,
    addProfileIntoMatchSearcherArray,
    updateIsSuperLikeAvailable,
    removeAllIdsFromProfileIdsAlreadyDownloaded,
    removeProfileFromMatchSearcher,
    setCurrentMatchedProfile
} = sliceMatch.actions;

export const useMatch = (state: any) => {
    return state.match as MatchStoreType;
}

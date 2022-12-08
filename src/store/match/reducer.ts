import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MatchStoreType {
    isGettingProfileForTheMatchSearcher: boolean | null,
    matchSearcherProfiles: any[],
    matchedProfiles: any[],
    profileIdsAlreadyDownloaded: any[],
    isSuperLikeAvailable: boolean,
    swipeCardRef: any,
}

const INITIAL_STATE: MatchStoreType = {
    isGettingProfileForTheMatchSearcher: null,
    matchSearcherProfiles: [],
    matchedProfiles: [],
    profileIdsAlreadyDownloaded: [],
    isSuperLikeAvailable: false,
    swipeCardRef: null,
}

const sliceMatch = createSlice({
    name: 'match',
    initialState: INITIAL_STATE,
    reducers: {
        updateSwipeCardRef(state, { payload }: PayloadAction<any>) {
            return { ...state, swipeCardRef: payload }
        },
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
            return { ...state, matchSearcherProfiles: [...state.matchSearcherProfiles, payload] }
        },
        updateIsSuperLikeAvailable(state, { payload }: PayloadAction<boolean>) {
            return { ...state, isSuperLikeAvailable: payload }
        },
        removeAllIdsFromProfileIdsAlreadyDownloaded(state, { payload }: PayloadAction<any>) {
            return { ...state, profileIdsAlreadyDownloaded: [] }
        },
        removeProfileFromMatchSearcher(state, { payload }: PayloadAction<any>) {
            return {
                ...state, matchSearcherProfiles:
                    payload.removeAll ? [] :
                        state.matchSearcherProfiles.filter(item => item.id !== payload.profileId)
            }
        },
    }
});

export default sliceMatch.reducer;
export const {
    updateSwipeCardRef,
    updateMatchedProfilesArray,
    updateIsGettingProfileForTheMatchSearcher,
    updateProfileIdsAlreadyDownloaded,
    addProfileIntoMatchSearcherArray,
    updateIsSuperLikeAvailable,
    removeAllIdsFromProfileIdsAlreadyDownloaded,
    removeProfileFromMatchSearcher
} = sliceMatch.actions;

export const useMatch = (state: any) => {
    return state.match as MatchStoreType;
}

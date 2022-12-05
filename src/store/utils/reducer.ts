import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilsStoreType {
    showLoader: boolean;
    isGeolocationEnabled: boolean;
    isGettingLocation: boolean;
}

const INITIAL_STATE: UtilsStoreType = {
    showLoader: false,
    isGeolocationEnabled: false,
    isGettingLocation: false
}

const sliceUtils = createSlice({
    name: 'utils',
    initialState: INITIAL_STATE,
    reducers: {
        showLoader(state, { payload }: PayloadAction<boolean>) {
            return { ...state, showLoader: payload }
        },
        updateIsGettingLocation(state, { payload }: PayloadAction<boolean>) {
            return { ...state, isGeolocationEnabled: payload }
        },
        setIsGeoLocationEnable(state, { payload }: PayloadAction<boolean>) {
            return { ...state, isGettingLocation: payload }
        }
    }
});

export default sliceUtils.reducer;
export const {
    showLoader,
    updateIsGettingLocation,
    setIsGeoLocationEnable
} = sliceUtils.actions;

export const useUtils = (state: any) => {
    return state.utils as UtilsStoreType;
}

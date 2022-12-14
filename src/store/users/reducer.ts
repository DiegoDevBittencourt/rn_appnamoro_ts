import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDataType {
    about?: string,
    address?: string,
    age?: string,
    ageRange?: number[],
    birthday?: any,
    company?: string,
    currentLongitude?: number,
    currentLatitude?: number
    email?: string,
    emailNotification?: boolean,
    firstName?: string,
    gender?: any,
    id?: string,
    lastLongitude?: number,
    lastLatitude?: number,
    lastName?: string,
    lastTimeSuperLikeWasUsed?: Date,
    maxDistance?: number,
    method?: string,
    oauthUId?: string,
    phone?: string,
    position?: string,
    profileComplete?: number,
    pushNotification?: boolean,
    schooling?: any,
    searchingBy?: any,
    showMeOnApp?: boolean,
    userImages?: any[],
    verifiedEmail?: number,
}

interface UserStoreType {
    userData: UserDataType;
}

const INITIAL_STATE: UserStoreType = {
    userData: {
        ageRange: [25, 35],
        maxDistance: 80,
        firstName: '',
        lastName: '',
        showMeOnApp: true
    },
}

const sliceUsers = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        updateUserDataOnRedux(state, { payload }: PayloadAction<UserDataType>) {
            return { ...state, userData: { ...state?.userData, ...payload } }
        }
    }
});

export default sliceUsers.reducer;
export const {
    updateUserDataOnRedux,
} = sliceUsers.actions;

export const useUsers = (state: any) => {
    return state.users as UserStoreType;
}

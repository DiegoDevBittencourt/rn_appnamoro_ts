import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDataType {
    id?: string,
    ageRange?: number[],
    maxDistance?: number,
    firstName?: string,
    lastName?: string,
    showMeOnApp?: boolean,
    lastTimeSuperLikeWasUsed?: Date,
    userImages?: any[],
    age?: string,
    position?: string,
    schooling?: any,
    email?: string,
    phone?: string,
    address?: string,
    searchingBy?: any,
    emailNotification?: boolean,
    pushNotification?: boolean,
    verifiedEmail?: number,
    about?: string,
    birthday?: any,
    gender?: any,
    company?: string,
    oauthUId?: string,
    method?: string,
    profileComplete?: number,
    lastLongitude?: number,
    lastLatitude?: number,
    currentLongitude?: number,
    currentLatitude?: number
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

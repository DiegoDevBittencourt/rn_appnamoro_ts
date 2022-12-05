import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultUserData = {
    ageRange: [25, 35],
    maxDistance: 80,
    firstName: '',
    lastName: '',
    showMeOnApp: true
};

interface UserDataType {
    ageRange: number[],
    maxDistance: number,
    firstName: string,
    lastName: string,
    showMeOnApp: boolean
}

interface UserStoreType {
    userData: UserDataType;
}

const INITIAL_STATE: UserStoreType = {
    userData: defaultUserData,
}

const sliceUsers = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        updateUserDataOnRedux(state, { payload }: PayloadAction<UserDataType>) {
            return { ...state, userData: payload }
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

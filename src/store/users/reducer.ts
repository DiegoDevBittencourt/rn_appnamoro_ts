import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDataType {
    id?: string,
    ageRange: number[],
    maxDistance: number,
    firstName: string,
    lastName: string,
    showMeOnApp: boolean,
    lastTimeSuperLikeWasUsed?: Date
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

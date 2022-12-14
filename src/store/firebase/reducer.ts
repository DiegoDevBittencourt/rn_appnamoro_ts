import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FirebaseStoreType {
    firebaseUid: string,
    firebaseUser: any,
    realTimeFirebaseChat: any[],
}

const INITIAL_STATE: FirebaseStoreType = {
    firebaseUid: '',
    firebaseUser: {},
    realTimeFirebaseChat: [],
}

const sliceFirebase = createSlice({
    name: 'firebase',
    initialState: INITIAL_STATE,
    reducers: {
        updateFirebaseUidOnRedux(state, { payload }: PayloadAction<any>) {
            return { ...state, firebaseUid: payload }
        },
        updateFirebaseUserOnRedux(state, { payload }: PayloadAction<any>) {
            return { ...state, firebaseUser: payload }
        },
        updateRealTimeFirebaseChat(state, { payload }: PayloadAction<any[]>) {
            return { ...state, realTimeFirebaseChat: payload }
        }
    }
});

export default sliceFirebase.reducer;
export const {
    updateFirebaseUidOnRedux,
    updateFirebaseUserOnRedux,
    updateRealTimeFirebaseChat
} = sliceFirebase.actions;

export const useFirebase = (state: any) => {
    return state.firebase as FirebaseStoreType;
}

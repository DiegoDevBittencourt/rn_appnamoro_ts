import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthStoreType {
    isAuthenticated: boolean,
    isCheckingIfTokenHasExpired: boolean,
    accessToken: string | null;
}

const INITIAL_STATE: AuthStoreType = {
    isAuthenticated: false,
    isCheckingIfTokenHasExpired: false,
    accessToken: null
}

const sliceAuth = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        updateAccessTokenOnRedux(state, { payload }: PayloadAction<string>) {
            return { ...state, accessToken: payload }
        },
        isCheckingIfTokenHasExpiredStatus(state, { payload }: PayloadAction<boolean>) {
            return { ...state, isCheckingIfTokenHasExpired: payload }
        },
        signUpAction(state) {
            return { ...state, isAuthenticated: true }
        },
        signOutAction(state) {
            return { ...state, isAuthenticated: false }
        },
        signInAction(state) {
            return { ...state, isAuthenticated: true }
        }
    }
});

export default sliceAuth.reducer;
export const {
    updateAccessTokenOnRedux,
    isCheckingIfTokenHasExpiredStatus,
    signUpAction,
    signOutAction,
    signInAction
} = sliceAuth.actions;

export const useAuth = (state: any) => {
    return state.auth as AuthStoreType;
}

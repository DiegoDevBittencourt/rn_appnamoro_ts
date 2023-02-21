import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MongodbStoreType {
    realTimeMongodbChat: any[],
}

const INITIAL_STATE: MongodbStoreType = {
    realTimeMongodbChat: [],
}

const sliceMongodb = createSlice({
    name: 'mongodb',
    initialState: INITIAL_STATE,
    reducers: {
        updateRealTimeMongodbChat(state, { payload }: PayloadAction<any[]>) {
            return { ...state, realTimeMongodbChat: payload }
        }
    }
});

export default sliceMongodb.reducer;
export const {
    updateRealTimeMongodbChat
} = sliceMongodb.actions;

export const useMongodb = (state: any) => {
    return state.mongodb as MongodbStoreType;
}

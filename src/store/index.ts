import { configureStore } from '@reduxjs/toolkit'

// import dashboard from './dashboard/reducer';
// import firebase from './firebase/reducer';
// import match from './match/reducer';
// import user from './user/reducer';
import auth from './auth/reducer';
import utils from './utils/reducer';

const store = configureStore({
    reducer: {
        auth,
        utils
    }
})

export default store;

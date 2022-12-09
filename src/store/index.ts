import { configureStore } from '@reduxjs/toolkit'

// import dashboard from './dashboard/reducer';
import firebase from './firebase/reducer';
import auth from './auth/reducer';
import utils from './utils/reducer';
import match from './match/reducer';
import users from './users/reducer';

const store = configureStore({
    reducer: {
        auth,
        utils,
        match,
        users,
        firebase
    }
})

export default store;

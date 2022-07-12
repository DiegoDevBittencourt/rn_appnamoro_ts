import React from 'react';
import firebase from "firebase";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

if (__DEV__) { import('@config/ReactotronConfig').then(() => console.warn('Reactotron Configured')) };

import store from '~/store';
import Routes from '@routes/index';
import { Loader } from '@components/index';
import { theme } from '@constants/StyledComponentsTheme';
import { useUtils } from '~/store/utils/reducer';
import { getCurrentRoutName, navigationRef } from '@routes/RootNavigationRef';
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTHDOMAIN,
  REACT_APP_FIREBASE_DATABASEURL,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_FIREBASE_STORAGEBUCKET,
  REACT_APP_FIREBASE_MESSAGINGSENDERID,
  REACT_APP_FIREBASE_APPID,
  REACT_APP_FIREBASE_MEASUREMENTID
} from '@env';

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASEURL,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: REACT_APP_FIREBASE_APPID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENTID
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({
    experimentalForceLongPolling: true,
    merge: true
  });
}

EStyleSheet.build(theme);

export default function App() {

  const TheLoader = () => {
    console.log('getCurrentRoutName', getCurrentRoutName());
    const { showLoader } = useSelector(useUtils);
    return showLoader ? <Loader /> : null
  }

  return <ThemeProvider theme={theme}>
    <Provider store={store}>
      <TheLoader />

      <NavigationContainer ref={navigationRef}>
        <Routes />
      </NavigationContainer>

    </Provider>
  </ThemeProvider>
};

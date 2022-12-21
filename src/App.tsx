import React, { useEffect } from 'react';
// import firebase from "firebase";
import * as Sentry from "@sentry/react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

if (__DEV__) { import('@config/ReactotronConfig').then(() => console.warn('Reactotron Configured')) };

import store from '~/store';
import Routes from '@routes/index';
import useRealmSync from './hooks/useRealmSync';
import { Loader } from '@components/index';
import { theme } from '@constants/styledComponentsTheme';
import { useUtils } from '~/store/utils/reducer';
import { navigationRef } from '@routes/RootNavigationRef';
// import {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_FIREBASE_AUTHDOMAIN,
//   REACT_APP_FIREBASE_DATABASEURL,
//   REACT_APP_FIREBASE_PROJECTID,
//   REACT_APP_FIREBASE_STORAGEBUCKET,
//   REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   REACT_APP_FIREBASE_APPID,
//   REACT_APP_FIREBASE_MEASUREMENTID
// } from '@env';

// const firebaseConfig = {
//   apiKey: REACT_APP_FIREBASE_API_KEY,
//   authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
//   databaseURL: REACT_APP_FIREBASE_DATABASEURL,
//   projectId: REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: REACT_APP_FIREBASE_APPID,
//   measurementId: REACT_APP_FIREBASE_MEASUREMENTID
// };

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
//   firebase.firestore().settings({
//     experimentalForceLongPolling: true,
//     merge: true
//   });
// }

EStyleSheet.build(theme);

const App = () => {

  // const { onRealmChange } = useRealmSync();

  useEffect(() => {
    Sentry.init({
      // dsn: "https://2977d4f34b4545f99ec82747d6f1a08d@o4504367205842944.ingest.sentry.io/4504367208529920",
      dsn: "https://8503d4b5a7414a6ca173a0692f82591e@o971799.ingest.sentry.io/5924202",
    });

    // onRealmChange();
  }, []);

  const TheLoader = () => {
    const { showLoader } = useSelector(useUtils);
    return showLoader ? <Loader /> : null
  }

  return <ThemeProvider theme={theme}>
    <Provider store={store}>

      <NavigationContainer ref={navigationRef}>
        <Routes />
      </NavigationContainer>

      <TheLoader />

      <FlashMessage position='bottom' />

    </Provider>
  </ThemeProvider>
};

export default Sentry.wrap(App);

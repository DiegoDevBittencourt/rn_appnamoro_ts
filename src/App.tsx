import 'react-native-get-random-values';

import React, { useEffect } from 'react';
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

EStyleSheet.build(theme);

const App = () => {

  // const { onRealmChange } = useRealmSync();

  useEffect(() => {
    Sentry.init({
      dsn: "https://2977d4f34b4545f99ec82747d6f1a08d@o4504367205842944.ingest.sentry.io/4504367208529920"
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

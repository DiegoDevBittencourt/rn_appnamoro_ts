import { showMessage } from 'react-native-flash-message';
import * as Sentry from '@sentry/react-native';

import AsyncStorage from '@react-native-community/async-storage';

export async function captureException({
  error,
  errorCode,
  hideFlashMessage = false,
}) {
  const userId = await AsyncStorage.getItem('@userId');

  if (__DEV__ && error && error.response) {
    console.warn(error.response);
  }

  if (error && error.response && error.response.data) {
    Sentry.setExtra('HTTP Response', error.response.data);
  }

  const errorMessage = error?.message ||
    error?.msg ||
    error?.data?.error?.message ||
    error?.response?.data?.error?.message ||
    error?.response?.data?.message;

  if (!hideFlashMessage) {
    showMessage({
      type: 'warning',
      message: `${errorMessage} ${errorCode}`,
    });
  }

  console.log('111')
  Sentry.captureException(error, {
    tags: {
      userId,
      errorCode
    },
    contexts: {
      'User Information': {
        userId,
        errorCode
      },
    },
  });
  console.log('222')
}

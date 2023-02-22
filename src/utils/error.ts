import { showMessage } from 'react-native-flash-message';
import * as Sentry from '@sentry/react-native';

import AsyncStorage from '@react-native-community/async-storage';

export async function captureException({
  error,
  errorCode,
  hideFlashMessage = false
}: {
  error: any,
  errorCode: string,
  hideFlashMessage?: boolean
}) {

  const userId = await AsyncStorage.getItem('@userId');

  if (__DEV__ && error) {
    console.log('error: ', error, errorCode);
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
}

import AsyncStorage from "@react-native-community/async-storage";
import Realm from "realm";

import { captureException } from "~/utils/error";
import { Chat } from './schemas';
import { MONGO_DATABASE_PATH, MONGO_APP_ID } from '@env';

export async function getRealmSync() {

  const partition_id = await AsyncStorage.getItem('@userId');
  const User = await anonymousLogin();

  const config = {
    path: MONGO_DATABASE_PATH,
    schema: [Chat],
    schemaVersion: 3,
    sync: {
      user: User,
      partitionValue: partition_id,
      newRealmFileBehavior: { type: 'downloadBeforeOpen', timeOutBehavior: 'throwException' },
      existingRealmFileBehavior: { type: 'openImmediately', timeOutBehavior: 'openLocalRealm' },
      flexible: false
    },
  };

  try {

    let realmDB = await Realm.open(config);
    return realmDB;

  } catch (error) {
    captureException({
      error,
      errorCode: "J828N5JG",
    });
  }
}

async function anonymousLogin() {
  let user;

  try {
    const app = getRealmApp();

    const credentials = Realm.Credentials.anonymous();//create an anonymous credential

    user = await app.logIn(credentials);

    return user;

  } catch (error) {
    captureException({
      error,
      errorCode: "Q824N5J0",
    });
    throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
  }
}

export function getRealmApp() {
  try {

    const appId = MONGO_APP_ID;
    const appConfig = {
      id: appId,
      timeout: 10000,
    };

    return new Realm.App(appConfig);

  } catch (error) {
    captureException({
      error,
      errorCode: "A874B5J8",
    });
  }
}

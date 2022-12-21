import AsyncStorage from "@react-native-community/async-storage";
import Realm from "realm";

import { STOCK_DATABASE_PATH, STOCK_PROJECT_ID } from "~/constants/stock";
import { ProductStock, StockHistory } from './schemas/Stocks';

export async function getRealmSync() {

  const menu_id = await AsyncStorage.getItem('@menu_id');
  const User = await anonymousLogin();

  const config = {
    path: STOCK_DATABASE_PATH,
    schema: [ProductStock, StockHistory],
    schemaVersion: 3,
    sync: {
      user: User,
      partitionValue: '1490',//menu_id,
      newRealmFileBehavior: { type: 'downloadBeforeOpen', timeOutBehavior: 'throwException' },
      existingRealmFileBehavior: { type: 'openImmediately', timeOutBehavior: 'openLocalRealm' },
      flexible: false
    },
  };

  try {

    let realmDB = await Realm.open(config);
    return realmDB;

  } catch (error) {
    // captureException({
    //   error,
    //   errorCode: "J828N5JG",
    //   context: "src/database/syncRealm/getRealmSync",
    // });
    console.log('Realm Error', error);
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
    // captureException({
    //   error,
    //   errorCode: "Q824N5J0",
    //   context: "src/database/syncRealm/anonymousLogin",
    // });
    throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
  }
}

export function getRealmApp() {
  try {

    const appId = STOCK_PROJECT_ID;
    const appConfig = {
      id: appId,
      timeout: 10000,
    };
    return new Realm.App(appConfig);

  } catch (error) {
    // captureException({
    //   error,
    //   errorCode: "A874B5J8",
    //   context: "src/database/syncRealm/getRealmApp",
    // });
  }
}

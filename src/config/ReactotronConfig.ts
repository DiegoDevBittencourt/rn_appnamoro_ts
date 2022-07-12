import AsyncStorage from '@react-native-community/async-storage';
import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const { scriptURL } = NativeModules.SourceCode;
const hostName = scriptURL.split('://')[1].split(':')[0]

Reactotron.setAsyncStorageHandler!!(AsyncStorage)
    .configure({ host: hostName })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

console.log = Reactotron.log!!;
Reactotron.clear!!();
export default Reactotron;

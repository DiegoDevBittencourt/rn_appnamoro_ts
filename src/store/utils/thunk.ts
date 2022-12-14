import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { PermissionsAndroid } from 'react-native';

import * as RootNavigationRef from '@routes/RootNavigationRef';
// import * as errorThunk from '@store/error/thunk';
import { setIsGeoLocationEnable, updateIsGettingLocation } from './reducer';
import { handleThunkError } from '../error/thunk';
import { TURN_ON_LOCATION_MODAL } from '~/constants/screenNames';
// import { TURN_ON_LOCATION_MODAL } from '~/constants/screenNames';
import { updateUserDataOnRedux } from '../users/reducer';
import { getNextProfileForTheMatchSearcher } from '../match/thunk';
import { REACT_APP_GEOCODE_API_KEY } from '@env';

Geocoder.init(REACT_APP_GEOCODE_API_KEY, { language: 'pt-br' });

export function getAddress() {
    return async (dispatch: any) => {

        const handleGeolocationError = (error: any) => {
            dispatch(updateIsGettingLocation(false));
            dispatch(setIsGeoLocationEnable(false));

            RootNavigationRef.push(TURN_ON_LOCATION_MODAL);

            dispatch(handleThunkError(error));
        }

        dispatch(updateIsGettingLocation(true));

        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Libere o acesso a sua localização!",
                message: 'O App Namoro precisa acessar sua localização para encontrar pessoas próximas.',
                buttonNeutral: "Perguntar depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
        );

        Geolocation.getCurrentPosition(
            (position) => {

                let lat = position?.coords?.latitude;
                let lng = position?.coords?.longitude;

                Geocoder.from({ lat, lng }).then(json => {

                    const address = json.results[6].formatted_address;

                    dispatch(setIsGeoLocationEnable(true));

                    dispatch(updateUserDataOnRedux({
                        address,
                        currentLongitude: lng,
                        currentLatitude: lat
                    }));

                    dispatch(updateUserDataOnRedux({
                        lastLongitude: lng,
                        lastLatitude: lat
                    }));

                    dispatch(updateIsGettingLocation(false));

                    dispatch(getNextProfileForTheMatchSearcher());

                }).catch(error => handleGeolocationError(error));
            },
            (error) => {
                handleGeolocationError(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }
}

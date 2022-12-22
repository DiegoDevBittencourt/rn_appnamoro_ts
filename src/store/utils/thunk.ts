import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as RootNavigationRef from '@routes/RootNavigationRef';
import { setIsGeoLocationEnabled, updateIsGettingLocation } from './reducer';
import { handleThunkError } from '../error/thunk';
import { TURN_ON_LOCATION_MODAL } from '~/constants/screenNames';
import { updateUserDataOnRedux } from '../users/reducer';
import { getNextProfileForTheMatchSearcher } from '../match/thunk';
import { updateUser } from '../users/thunk';
import { REACT_APP_GEOCODE_API_KEY } from '@env';

Geocoder.init(REACT_APP_GEOCODE_API_KEY, { language: 'pt-br' });

export function getAddress() {
    return async (dispatch: any) => {

        dispatch(updateIsGettingLocation(true));

        const locationAllowed = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Libere o acesso a sua localização!",
                message: 'O App Namoro precisa acessar sua localização para encontrar pessoas próximas.',
                buttonNeutral: "Perguntar depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
        );

        const handleGeolocationError = (error: any) => {
            dispatch(updateIsGettingLocation(false));
            dispatch(setIsGeoLocationEnabled(false));

            if (locationAllowed != PermissionsAndroid.RESULTS.GRANTED)
                RootNavigationRef.push(TURN_ON_LOCATION_MODAL);

            dispatch(handleThunkError(error));
        }

        Geolocation.getCurrentPosition(
            (position) => {

                let lat = position?.coords?.latitude;
                let lng = position?.coords?.longitude;

                Geocoder.from({ lat, lng }).then(async json => {

                    const address = json.results[6].formatted_address;

                    dispatch(setIsGeoLocationEnabled(true));

                    dispatch(updateUserDataOnRedux({
                        address,
                        currentLongitude: lng,
                        currentLatitude: lat,
                        lastLongitude: lng,
                        lastLatitude: lat
                    }));

                    dispatch(updateUser({
                        user: {
                            lastLongitude: lng,
                            lastLatitude: lat
                        }
                    }));

                    dispatch(updateIsGettingLocation(false));

                    await AsyncStorage.setItem('@currentLongitude', String(lng));
                    await AsyncStorage.setItem('@currentLatitude', String(lat));

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

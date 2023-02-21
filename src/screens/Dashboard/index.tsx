import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import DashboardTabNavigator from './DashboardTabNavigator';
import useRealmSync from '~/hooks/useRealmSync';
import { decodeJwtToken } from '~/utils/functions';
import { GenericContainer } from '@components/index';
import { updateUserDataOnRedux } from '~/store/users/reducer';
import { updateAccessTokenOnRedux } from '~/store/auth/reducer';
import { checkIfTokenHasExpired } from '~/store/auth/thunk';

const Dashboard = () => {

    const dispatch = useDispatch<any>();
    const { onRealmChange } = useRealmSync();

    useEffect(() => {
        dashboardInitialization();
        onRealmChange();
    }, []);

    const dashboardInitialization = async () => {

        const accessToken = await AsyncStorage.getItem('@accessToken');

        //needs the id to be used when download data from resource server:
        dispatch(updateUserDataOnRedux({ id: decodeJwtToken(accessToken || '').id }));
        dispatch(updateAccessTokenOnRedux(accessToken || ''));
        dispatch(checkIfTokenHasExpired());
    }

    return <GenericContainer>
        <DashboardTabNavigator />
    </GenericContainer>
}

export default Dashboard;

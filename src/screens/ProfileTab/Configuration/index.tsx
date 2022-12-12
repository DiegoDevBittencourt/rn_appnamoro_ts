import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// import * as userThunk from '~/store/users/thunk';
import ConfigurationContent from './ConfigurationContent';
import { GenericContainer, Toolbar } from '@components/index';
import { theme } from '~/constants/StyledComponentsTheme';

export default function Configuration() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(userThunk.getUserData());
    }, []);

    return <GenericContainer>

        <Toolbar
            onLeftElementPress={() => navigation?.goBack()}
            title={'Configurações'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <ConfigurationContent />

    </GenericContainer>
}

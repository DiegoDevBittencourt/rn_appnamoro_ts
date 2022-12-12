import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import * as userThunk from '~/store/users/thunk';
import { GenericContainer } from '@components/index';
import ConfigToolbar from './ConfigToolbar';
import ConfigurationContent from './ConfigurationContent';

export default function Configuration() {

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(userThunk.getUserData());
    }, []);

    return <GenericContainer>

        <ConfigToolbar />

        <ConfigurationContent />

    </GenericContainer>
}

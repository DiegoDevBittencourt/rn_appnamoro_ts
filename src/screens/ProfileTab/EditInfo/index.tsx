import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { theme } from '@constants/styledComponentsTheme';
import { GenericContainer, Toolbar, GenericScrollView } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import PicturesEditor from './PicturesEditor';
import UserInfoEditor from './UserInfoEditor';
import { getUserData } from '~/store/users/thunk';

const EditInfo = () => {

    const dispatch = useDispatch<any>();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(getUserData({
            shouldGetAddress: true,
            shouldGetProfilesForMatchSearcher: true,
            shouldGetMatchedProfiles: true
        }));
    }, []);

    return <GenericContainer>

        <Toolbar
            onLeftElementPress={() => navigation.goBack()}
            title={'Editar Info'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <GenericScrollView>

            <PicturesEditor />

            <UserInfoEditor />

        </GenericScrollView>

    </GenericContainer>
}

export default EditInfo;

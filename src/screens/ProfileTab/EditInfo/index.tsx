import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import * as userThunk from '~/store/users/thunk';
import { theme } from '@constants/StyledComponentsTheme';
import { GenericContainer, Toolbar, GenericScrollView } from '@components/index';
import PicturesEditor from './PicturesEditor';
import UserInfoEditor from './UserInfoEditor';
import { useNavigation } from '@react-navigation/native';

const EditInfo = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        // dispatch(userThunk.getUserData());
    }, []);

    return <GenericContainer>

        <Toolbar
            leftElement={'arrow-back'}
            customLeftElement={{ color: 'white' }}
            onLeftElementPress={() => navigation.goBack()}
            title={'Editar Info'}
            customTitleText={{ alignSelf: 'flex-start', color: 'white' }}
            showSearchIcon={false}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <GenericScrollView>

            <PicturesEditor />

            <UserInfoEditor />

        </GenericScrollView>

    </GenericContainer>
}

export default EditInfo;

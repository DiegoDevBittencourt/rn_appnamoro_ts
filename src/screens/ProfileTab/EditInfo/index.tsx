import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import * as userThunk from '~/store/users/thunk';
import { theme } from '@constants/StyledComponentsTheme';
import { GenericContainer, Toolbar, GenericScrollView } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import PicturesEditor from './PicturesEditor';
import UserInfoEditor from './UserInfoEditor';

const EditInfo = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        // dispatch(userThunk.getUserData());
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

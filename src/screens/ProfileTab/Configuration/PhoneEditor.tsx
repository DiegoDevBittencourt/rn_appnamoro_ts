import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { GenericAppButton, GenericContainer, SectionTitle, TextInputRightIconButton, Toolbar } from '@components/index';
import { useDashboard } from '~/store/dashboard/reducer';
import { MainContainer } from './styles';
import { theme } from '~/constants/StyledComponentsTheme';
import { useUsers } from '~/store/users/reducer';

const PhoneEditor = () => {

    const navigation = useNavigation();
    const { selectedConfigMenu, selectedConfigMenuTitle } = useSelector(useDashboard);

    const { userData } = useSelector(useUsers);
    const { phone } = userData;

    const [phoneLocal, setPhoneLocal] = useState(phone);
    const [isUpdateButtonEnable, setIsUpdateButtonEnable] = useState(false);

    useEffect((() => {
        setIsUpdateButtonEnable(phoneLocal != '' && phone !== phoneLocal);
    }), [phoneLocal]);

    const customButtonStyle = {
        alignSelf: 'center',
        marginTop: 20
    }

    const updateUserPhone = () => {
        // isUpdateButtonEnable && dispatch(userThunk.updateUser({ phone: phoneLocal }, true)).then(() => navigation.goBack());
    }

    return <MainContainer>

        <Toolbar
            onLeftElementPress={() => navigation?.goBack()}
            title={'Telefone'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <SectionTitle titleText={selectedConfigMenuTitle} />

        <GenericContainer style={{ paddingLeft: 10, paddingRight: 10 }}>

            <TextInputRightIconButton
                placeholder={'Digite seu telefone aqui'}
                keyboardType={'phone-pad'}
                value={phoneLocal}
                onChangeText={(value) => setPhoneLocal(value)}
            />

            <GenericAppButton
                enable={isUpdateButtonEnable}
                customButtonStyle={customButtonStyle}
                textButton='Atualizar telefone'
                onPress={updateUserPhone}
            />

        </GenericContainer>

    </MainContainer>
}

export default PhoneEditor;

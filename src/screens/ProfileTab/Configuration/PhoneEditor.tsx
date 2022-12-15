import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { GenericAppButton, GenericContainer, SectionTitle, TextInputRightIconButton, Toolbar } from '@components/index';
import { useDashboard } from '~/store/dashboard/reducer';
import { MainContainer } from './styles';
import { theme } from '~/constants/styledComponentsTheme';
import { useUsers } from '~/store/users/reducer';
import { updateUser } from '~/store/users/thunk';
import { phoneMask } from '~/utils/functions';

const PhoneEditor = () => {

    const dispatch = useDispatch<any>();
    const navigation = useNavigation();
    const { selectedConfigMenuTitle } = useSelector(useDashboard);

    const { userData } = useSelector(useUsers);
    const { phone } = userData;

    const [phoneLocal, setPhoneLocal] = useState(phoneMask(phone));
    const [isUpdateButtonEnable, setIsUpdateButtonEnable] = useState(false);

    useEffect((() => {
        setIsUpdateButtonEnable(phoneLocal != '' && phone !== phoneLocal);
    }), [phoneLocal]);

    const customButtonStyle = {
        alignSelf: 'center',
        marginTop: 20
    }

    const updateUserPhone = () => {
        isUpdateButtonEnable && dispatch(updateUser({ user: { phone: phoneLocal }, shouldShowLoader: true })).then(() => navigation.goBack());
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

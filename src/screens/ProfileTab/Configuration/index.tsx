import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { theme } from '@constants/styledComponentsTheme';
// import * as userThunk from '~/store/users/thunk';
// import * as dashboardActions from '@store/dashboard/actions';
import {
    SectionTitle,
    ConfigItem,
    MultiSlider,
    DevelopedBy,
    AppVersion,
    GenericScrollView,
    Toolbar,
    GenericContainer
} from '@components/index';
import { useUsers } from '~/store/users/reducer';
import { setSelectedConfigMenu } from '~/store/dashboard/reducer';
import {
    CONTACT_MODAL,
    EMAIL_EDITOR_SCREEN,
    LOCATION_EDITOR_SCREEN,
    PHONE_EDITOR_SCREEN,
    SEARCHING_BY_EDITOR_SCREEN
} from '~/constants/screenNames';

const Configuration = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const { userData } = useSelector(useUsers);
    const {
        email,
        phone,
        address,
        searchingBy,
        maxDistance,
        ageRange,
        showMeOnApp,
        emailNotification,
        pushNotification
    } = userData;

    const [maxDistanceLocal, setMaxDistanceLocal] = useState([maxDistance]);
    const [ageRangeLocal, setAgeRangeLocal] = useState([ageRange[0], ageRange[1]]);
    const [showMeOnAppLocal, setShowMeOnAppLocal] = useState(showMeOnApp);
    const [emailNotificationLocal, setEmailNotificationLocal] = useState(emailNotification);
    const [pushNotificationLocal, setPushNotificationLocal] = useState(pushNotification);

    useEffect(() => {
        // dispatch(userThunk.getUserData());
    }, []);

    useEffect(() => {
        setMaxDistanceLocal([maxDistance]);
        setAgeRangeLocal([ageRange[0], ageRange[1]]);
        setShowMeOnAppLocal(showMeOnApp);
        setEmailNotificationLocal(emailNotification);
        setPushNotificationLocal(pushNotification);
    }, [userData]);

    const multiSliderCustomStyle = {
        backgroundColor: 'white',
        borderColor: theme.$lightGray,
        borderWidth: 1,
        marginBottom: -1,
        height: 90
    };

    const handleDeleteAccountPress = () => {
        navigation.push('GenericYesNoModal', {
            title: 'Excluir conta?',
            subtitle: 'Todos os dados serão apagados. Esta ação não pode ser desfeita!',
            acceptText: 'Excluir',
            denyText: 'Cancelar',
            selectedMethod: 'genericYesNoModalDeleteAccount'
        });
    }

    const setSelectedConfigMenuAndChangeScreen = (selectedConfigMenu: string, selectedConfigMenuTitle: string) => {
        dispatch(setSelectedConfigMenu({ selectedConfigMenu, selectedConfigMenuTitle }));
        changeScreen(selectedConfigMenu);
    }

    const changeScreen = (screenName: string) => navigation.push(screenName);

    const updateUserData = (newUserData?: any, CleanMatchSearcherArrayAndGetNextProfile?: boolean) => {
        // dispatch(
        // userThunk.updateUser(newUserData, false, CleanMatchSearcherArrayAndGetNextProfile)
        // );
    }

    const handleTermsPress = () => Linking.openURL('https://www.appnamoro.com/terms');

    return <GenericContainer>

        <Toolbar
            onLeftElementPress={() => navigation?.goBack()}
            title={'Configurações'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />
        <GenericScrollView>

            <SectionTitle titleText='CONFIGURAÇÕES DA CONTA' />

            <ConfigItem
                leftText='E-mail'
                rightText={email}
                onPress={() => setSelectedConfigMenuAndChangeScreen(EMAIL_EDITOR_SCREEN, 'SEU EMAIL')}
            />

            <ConfigItem
                leftText='Número de telefone'
                rightText={phone}
                onPress={() => setSelectedConfigMenuAndChangeScreen(PHONE_EDITOR_SCREEN, 'SEU TELEFONE')}
            />

            <SectionTitle titleText='AJUSTES DE DESCOBERTA' />

            <ConfigItem
                onPress={() => setSelectedConfigMenuAndChangeScreen(LOCATION_EDITOR_SCREEN, 'LOCALIZAÇÃO')}
                leftText='Localização'
                rightText={address ? address : 'Não definida'}
            />

            <MultiSlider
                title={'Faixa etária'}
                customContainerStyle={multiSliderCustomStyle}
                values={ageRangeLocal}
                onValuesChange={(value: any) => setAgeRangeLocal([value[0], value[1]])}
                onValuesChangeFinish={() => updateUserData({ ageRange: `${ageRangeLocal[0]},${ageRangeLocal[1]}` }, true)}
                min={18}
                max={55}
            />

            <MultiSlider
                title={'Distância máxima'}
                values={maxDistanceLocal}
                customContainerStyle={multiSliderCustomStyle}
                rightText={'km'}
                onValuesChange={(value: any) => setMaxDistanceLocal(value)}
                onValuesChangeFinish={(value: any) => updateUserData({ maxDistance: value[0] }, true)}
                min={2}
                max={500}
            />

            <ConfigItem
                leftText='Procurando por'
                rightText={searchingBy?.label}
                onPress={() => setSelectedConfigMenuAndChangeScreen(SEARCHING_BY_EDITOR_SCREEN, 'PROCURO POR')}
            />

            <ConfigItem
                handleSwitchChange={(value: any) => { setShowMeOnAppLocal(value), updateUserData({ showMeOnApp: value }) }}
                leftText='Mostrar-me no App'
                isThisSwitch
                isSwitchOn={showMeOnAppLocal}
            />

            <SectionTitle titleText='NOTIFICAÇÕES' />

            <ConfigItem
                handleSwitchChange={(value: any) => {
                    setEmailNotificationLocal(value), updateUserData({ emailNotification: value })
                }}
                leftText='Email'
                isThisSwitch
                isSwitchOn={emailNotificationLocal}
            />

            <ConfigItem
                handleSwitchChange={(value: any) => {
                    setPushNotificationLocal(value), updateUserData({ pushNotification: value })
                }}
                leftText='Notificações por Push'
                isThisSwitch
                isSwitchOn={pushNotificationLocal}
            />

            <SectionTitle titleText='CONTATO' />

            <ConfigItem onPress={() => changeScreen(CONTACT_MODAL)} leftText='Ajuda e Suporte' />

            <SectionTitle titleText='JURÍDICO' />

            <ConfigItem onPress={handleTermsPress} leftText='Termos de uso' />

            <SectionTitle titleText='ZONA DE PERIGO' />

            <ConfigItem
                leftText='Excluir conta'
                onPress={handleDeleteAccountPress}
            />

            <DevelopedBy />

            <AppVersion />

        </GenericScrollView>
    </GenericContainer>
}

export default Configuration;

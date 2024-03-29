import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useDashboard } from '~/store/dashboard/reducer';
import { theme } from '~/constants/styledComponentsTheme';
import { useUsers } from '~/store/users/reducer';
import { MainContainer, PCustom } from './styles';
import {
    GenericAppButton,
    GenericScrollView,
    SectionTitle,
    TextInputRightIconButton,
    Toolbar
} from '@components/index';
import { emailValidator } from '~/utils/functions';
import { sendEmailVerification } from '~/store/dashboard/thunk';
import { dangerNotification } from '~/utils/notifications';

const EmailEditor = () => {

    const dispatch = useDispatch<any>();
    const navigation = useNavigation();
    const { selectedConfigMenuTitle } = useSelector(useDashboard);

    const { userData } = useSelector(useUsers);
    const { verifiedEmail, email } = userData;

    const [emailLocal, setEmailLocal] = useState<any>(email);
    const [verifiedEmailLocal, setVerifiedEmailLocal] = useState(verifiedEmail == 1);

    const customButtonStyle = {
        alignSelf: 'center',
        marginTop: 20,
    }

    useEffect(() => {
        setVerifiedEmailLocal((emailLocal == email) && verifiedEmail == 1);
    }, [verifiedEmailLocal]);

    const handleSendEmailVerification = async () => {
        if (!verifiedEmailLocal)
            if (emailValidator(emailLocal))
                dispatch(sendEmailVerification(emailLocal));
            else dangerNotification('Digite um email válido!');
    }

    const changeEmailText = (value: string) => {
        setEmailLocal(value);
        setVerifiedEmailLocal(value == email);
    }

    return <MainContainer>

        <Toolbar
            onLeftElementPress={() => navigation?.goBack()}
            title={'Email'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <SectionTitle titleText={selectedConfigMenuTitle} />

        <GenericScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>

            <TextInputRightIconButton
                placeholder={'Digite seu email aqui'}
                showRightButton
                keyboardType={'email-address'}
                solidIcon
                value={emailLocal}
                onChangeText={changeEmailText}
                customIconStyle={{ color: verifiedEmailLocal ? theme.$blue : theme.$red }}
                iconName={verifiedEmailLocal ? 'check' : 'times'}
                onButtonPress={null}
            />

            {
                verifiedEmailLocal ? <PCustom>{'Email já verificado'}</PCustom>
                    : <PCustom>{'Email ainda não verificado, verifique-o para aumentar sua segurança.'}</PCustom>
            }

            <GenericAppButton
                enable={!verifiedEmailLocal}
                customButtonStyle={customButtonStyle}
                textButton='Me envie um email de verificação'
                onPress={handleSendEmailVerification}
            />

        </GenericScrollView>

    </MainContainer>
}

export default EmailEditor;

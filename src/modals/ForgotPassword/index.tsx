import React, { useState } from "react";
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

// import * as dashboardThunk from '@store/dashboard/thunk';
import { dangerNotification } from '~/utils/notifications';
import { emailValidator } from '~/utils/functions';
import { GenericModalContainer, TextInputRightIconButton, GenericAppButton } from '@components/index';
import { goBack } from "~/routes/RootNavigationRef";
import { PCustom } from "./styles";
import { sendRecoverPasswordEmail } from "~/store/dashboard/thunk";

const ForgotPassword = () => {

    const dispatch = useDispatch<any>();

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const handleSendRecoverPasswordEmail = async () => {
        if (emailValidator(forgotPasswordEmail)) {

            Keyboard.dismiss();

            dispatch(sendRecoverPasswordEmail(forgotPasswordEmail)).then(() => goBack());

        }
        else dangerNotification('Digite um email válido!');
    }

    return <GenericModalContainer closeButtonPress={goBack} title={'Digite seu email abaixo'}>

        <TextInputRightIconButton
            placeholder={'Email'}
            value={forgotPasswordEmail}
            returnKeyType={'done'}
            onChangeText={(value) => setForgotPasswordEmail(value)}
        />

        <GenericAppButton
            customButtonStyle={{ margin: 30, marginBottom: 0, width: 'auto' }}
            textButton={'ENVIAR'}
            onPress={handleSendRecoverPasswordEmail}
        />

        <PCustom>Enviaremos um e-mail contendo os passos para resetar sua senha!</PCustom>

    </GenericModalContainer>
}

export default ForgotPassword;

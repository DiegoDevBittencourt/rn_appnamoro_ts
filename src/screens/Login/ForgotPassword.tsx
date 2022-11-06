import React from 'react';

import { push } from '~/routes/RootNavigationRef';
import { ForgotPasswordContainer, ForgotPasswordText } from './styles';
import { FORGOT_PASSWORD_MODAL } from '~/constants/screenNames';


export default function ForgotPassword() {

    const showForgotPasswordModal = () => push(FORGOT_PASSWORD_MODAL);

    return <ForgotPasswordContainer>
        <ForgotPasswordText onPress={showForgotPasswordModal}>Esqueceu a senha?</ForgotPasswordText>
    </ForgotPasswordContainer>
}

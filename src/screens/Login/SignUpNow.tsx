import React from 'react';

import { push } from '~/routes/RootNavigationRef';
import { SignUpNowContainer, SignUpNowText1, SignUpNowText2 } from './styles';
import { SIGN_UP_MODAL } from '~/constants/screenNames';

export default function SignUpNow() {

    const showSignUpModal = () => push(SIGN_UP_MODAL);

    return <SignUpNowContainer>
        <SignUpNowText1>{'Ainda não possui conta? '}
            <SignUpNowText2 className="p" onPress={showSignUpModal}>{'Cadastre-se agora!'}</SignUpNowText2>
        </SignUpNowText1>
    </SignUpNowContainer>
}

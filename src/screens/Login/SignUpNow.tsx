import React from 'react';

import { push } from '~/routes/RootNavigationRef';
import { SignUpNowContainer, SignUpNowText1, SignUpNowText2 } from './styles';

export default function SignUpNow() {

    const showSignUpModal = () => push('SignUpModal');

    return <SignUpNowContainer>
        <SignUpNowText1>{'Ainda não possui conta? '}
            <SignUpNowText2 className="p" onPress={showSignUpModal}>{'Cadastre-se agora!'}</SignUpNowText2>
        </SignUpNowText1>
    </SignUpNowContainer>
}

import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import SocialButtons from './SocialButtons';
import ForgotPassword from './ForgotPassword';
import SignUpNow from './SignUpNow';
import { theme } from '@constants/styledComponentsTheme';
import { dangerNotification } from '~/utils/notifications'
import { H2, LineTextLine, TextInputRightIconButton, GenericAppButton } from '@components/index';
import { signInLocal } from '@store/auth/thunk';
import { captureException } from '~/utils/error';
import { LoginCardContainer, cardContainerStyle } from './styles';

export default function LoginCard() {

    const dispatch = useDispatch<any>();

    const [email, setEmail] = useState('diego6d@gmail.com');
    const [password, setPassword] = useState('123456789a');
    const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
    const tiPassword = useRef<any>();

    const localLogin = () => {
        try {
            if (email && password) {
                const userData = { email, password };
                dispatch(signInLocal(userData));
            }
            else
                dangerNotification("Preencha os campos Email e Senha");
        } catch (error) {
            captureException({
                error,
                errorCode: 'localLogin'
            });
        }
    }

    return <LoginCardContainer style={cardContainerStyle?.loginCardContainer}>

        <H2>Entrar</H2>

        <SocialButtons />

        <LineTextLine text={'ou'} />

        <TextInputRightIconButton
            placeholder={'Email'}
            value={email}
            returnKeyType={'next'}
            onChangeText={setEmail}
            onSubmitEditing={() => tiPassword?.current?.focus()}
        />

        <TextInputRightIconButton
            reference={tiPassword}
            placeholder={'Senha'}
            showRightButton
            solidIcon
            value={password}
            onChangeText={setPassword}
            customIconStyle={{ color: theme.$gray }}
            iconName={passwordSecureTextEntry ? 'eye-slash' : 'eye'}
            secureTextEntry={passwordSecureTextEntry}
            underlayColor={theme.$lightGray}
            onButtonPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
        />

        <GenericAppButton
            customButtonStyle={{ marginTop: 20 }}
            textButton={'ENTRAR'}
            onPress={localLogin}
        />

        <ForgotPassword />

        <SignUpNow />

    </LoginCardContainer>
}

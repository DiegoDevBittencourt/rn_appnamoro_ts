import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import * as firebaseThunk from '@store/firebase/thunk';
import { TextInput, GenericAppButton, RoundIconButton } from '@components/index';
import { theme } from '@constants/styledComponentsTheme';
import { successNotification } from '~/utils/notifications';
import { FooterContainer } from './styles';

const Footer = ({ matchedProfile }: any) => {

    const tiMessage = useRef();
    const dispatch = useDispatch();

    const { $lightGray, $primaryColor } = theme;

    const [message, setMessage] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [sendMessageButtonEnable, setSendMessageButtonEnable] = useState(false);

    useEffect(() => {
        setSendMessageButtonEnable(message != '');
    }, [message]);

    const sendMessage = async () => {

        if (message != '' && !isSendingMessage) {
            setIsSendingMessage(true);

            // dispatch(firebaseThunk.sendMessageToFirebase(message, matchedProfile.id))
            //     .then(() => {
            //         setIsSendingMessage(false);
            //         setMessage('');
            //     });
        }
    }

    const handleEmoticonClick = () => successNotification(
        'Emoticons não estão disponíveis no momento, estamos trabalhando para disponibilizá-los em breve! =)'
    );

    return <FooterContainer>
        <TextInput
            reference={tiMessage}
            customInputStyle={{ borderWidth: 0 }}
            placeholder={'Digite uma mensagem'}
            solidIcon
            returnKeyType={'done'}
            value={message}
            onChangeText={(value: string) => setMessage(value)}
        />

        <RoundIconButton
            customButtonStyle={{
                elevation: 0,
                height: 45,
                width: 45,
                marginRight: 2
            }}
            customIconStyle={{ fontSize: 30, color: $primaryColor }}
            iconName={'smile-wink'}
            underlayColor={$lightGray}
            onPress={handleEmoticonClick}
        />

        <GenericAppButton
            enable={sendMessageButtonEnable}
            customButtonStyle={{ height: 45, width: 80, marginRight: 5 }}
            textButton={'Enviar'}
            onPress={sendMessage}
        />
    </FooterContainer>
}

export default Footer;

import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { TextInput, GenericAppButton, RoundIconButton } from '@components/index';
import { theme } from '@constants/styledComponentsTheme';
import { successNotification } from '~/utils/notifications';
import { FooterContainer } from './styles';
import { insert } from '~/database/transactions';
import { CHAT_SCHEMA } from '~/constants/generic';
import { useUsers } from '~/store/users/reducer';
import { captureException } from '~/utils/error';
import { MONGO_DATABASE_PATH } from '@env';

const Footer = ({ matchedProfile }: any) => {

    const tiMessage = useRef<any>();

    const { userData } = useSelector(useUsers);

    const { $lightGray, $primaryColor } = theme;

    const [message, setMessage] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [sendMessageButtonEnable, setSendMessageButtonEnable] = useState(false);

    useEffect(() => {
        setSendMessageButtonEnable(message != '');
        tiMessage?.current?.focus();
    }, [message]);

    const sendMessage = async () => {
        try {
            if (message != '' && !isSendingMessage) {
                setIsSendingMessage(true);

                const chatBody1 = {
                    _id: uuidv4(),
                    _partition: MONGO_DATABASE_PATH,
                    message,
                    userId_sender: userData?.id,
                    userId_receiver: matchedProfile?.id,
                    created_at: new Date(),
                };

                await insert({
                    schema: CHAT_SCHEMA,
                    data: chatBody1,
                });

                setIsSendingMessage(false);
                setMessage('');
            }
        } catch (error) {
            setIsSendingMessage(false);
            setMessage('');

            captureException({
                error,
                errorCode: "QDE37592"
            });
        }
    }

    const handleEmoticonClick = () => successNotification(
        'Emoticons não estão disponíveis no momento, estamos trabalhando para disponibilizá-los em breve! =)'
    );

    return <FooterContainer>
        <TextInput
            autoFocus
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

import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { emailValidator } from '~/utils/functions';
import { dangerNotification } from '~/utils/notifications';
import { TextInputRightIconButton, GenericAppButton } from '@components/index';
import { MainContainer } from './styles';
import { GenericModalContainer } from '@components/index';
import { sendNewUserContact } from '~/store/dashboard/thunk';

const Contact = () => {

    const dispatch = useDispatch<any>();
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const tiEmail = useRef<any>();
    const tiSubject = useRef<any>();
    const tiMessage = useRef<any>();

    const handleSendNewUserContact = async () => {

        if (emailValidator(email)) {
            name && email && subject && message ?
                dispatch(sendNewUserContact({ name, email, subject, message }))
                    .then(() => navigation.goBack())
                :
                dangerNotification('Preencha todos os campos antes de continuar.');
        }
        else dangerNotification('Digite um email válido!');
    }

    return <GenericModalContainer closeButtonPress={() => navigation?.goBack()} title={'Fale conosco!'}>
        <MainContainer>

            <TextInputRightIconButton
                placeholder={'Nome'}
                value={name}
                returnKeyType={'next'}
                onChangeText={(value) => setName(value)}
                onSubmitEditing={() => tiEmail.current.focus()}
            />

            <TextInputRightIconButton
                reference={tiEmail}
                placeholder={'Email'}
                keyboardType={'email-address'}
                value={email}
                returnKeyType={'next'}
                onChangeText={(value) => setEmail(value)}
                onSubmitEditing={() => tiSubject.current.focus()}
            />

            <TextInputRightIconButton
                reference={tiSubject}
                placeholder={'Assunto'}
                value={subject}
                returnKeyType={'next'}
                onChangeText={(value) => setSubject(value)}
                onSubmitEditing={() => tiMessage.current.focus()}
            />

            <TextInputRightIconButton
                reference={tiMessage}
                placeholder={'Mensagem'}
                value={message}
                returnKeyType={'next'}
                multiline
                onChangeText={(value) => setMessage(value)}
                customContainerStyle={{ height: 200 }}
                textAlignVertical='top'
            />

            <GenericAppButton
                customButtonStyle={{ margin: 30, width: 'auto' }}
                textButton={'ENVIAR'}
                onPress={handleSendNewUserContact}
            />

        </MainContainer>
    </GenericModalContainer>
}

export default Contact;

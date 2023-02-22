import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import * as Options from '~/constants/options';
import { theme } from '@constants/styledComponentsTheme';
import { convertDateStringFromDDMMYYYYtoMMDDYYYY, phoneMask } from '~/utils/functions';
import { dangerNotification } from '~/utils/notifications';
import { MainContainer } from './styles';
import { RNModalSelectorDataType } from '~/components/ModalSelector/interface';
import { signUp } from '~/store/auth/thunk';
import {
    TextInputRightIconButton,
    DatePickerButton,
    ModalSelector,
    MultiSlider,
    GenericAppButton
} from '@components/index';

export default function SignUpFields() {

    const dispatch = useDispatch<any>();

    const { $lightGray, $gray } = theme;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState<any>('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState<RNModalSelectorDataType>();
    const [searchingBy, setSearchingBy] = useState<RNModalSelectorDataType>();
    const [ageRange, setAgeRange] = useState([22, 35]);
    const [maxDistance, setMaxDistance] = useState([80]);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
    const [passwordConfirmationSecureTextEntry, setPasswordConfirmationSecureTextEntry] = useState(true);

    const tiLastName = useRef<any>();
    const tiEmail = useRef<any>();
    const tiPhone = useRef<any>();
    const tiPassword = useRef<any>();
    const tiPasswordConfirmation = useRef<any>();

    const createNewAccount = async () => {
        if (password === passwordConfirmation) {

            if (firstName !== '' && lastName !== '' && email !== '' && birthday && gender && searchingBy) {
                const userData = ({
                    id: uuidv4(),
                    firstName,
                    lastName,
                    email,
                    phone,
                    birthday: convertDateStringFromDDMMYYYYtoMMDDYYYY(birthday),
                    gender: gender?.key,
                    searchingBy: searchingBy?.key,
                    ageRange: ageRange[0] + ',' + ageRange[1],
                    maxDistance: maxDistance[0],
                    password,

                    //some default values:
                    method: 'local',
                    showMeOnApp: 0,
                    verifiedEmail: 0,
                    emailNotification: 1,
                    pushNotification: 1
                });

                dispatch(signUp(userData));
            }
            else {
                dangerNotification('Preencha todos os campos antes de continuar.');
            }
        }
        else {
            dangerNotification('As senhas devem ser iguais.');
        }
    }

    return <MainContainer>

        <TextInputRightIconButton
            placeholder={'Nome'}
            value={firstName}
            returnKeyType={'next'}
            onChangeText={(value) => setFirstName(value)}
            onSubmitEditing={() => tiLastName?.current?.focus()}
        />

        <TextInputRightIconButton
            reference={tiLastName}
            placeholder={'Sobrenome'}
            value={lastName}
            returnKeyType={'next'}
            onChangeText={(value) => setLastName(value)}
            onSubmitEditing={() => tiEmail?.current?.focus()}
        />

        <TextInputRightIconButton
            reference={tiEmail}
            placeholder={'Email'}
            keyboardType={'email-address'}
            value={email}
            returnKeyType={'next'}
            onChangeText={(value) => setEmail(value)}
            onSubmitEditing={() => tiPhone?.current?.focus()}
        />

        <TextInputRightIconButton
            reference={tiPhone}
            placeholder={'Telefone'}
            keyboardType={'phone-pad'}
            value={phone}
            returnKeyType={'next'}
            onChangeText={(value) => setPhone(phoneMask(value))}
        />

        <DatePickerButton
            selectedDate={birthday}
            updateSelectedDate={(selectedDate: string) => setBirthday(selectedDate)}
        />

        <ModalSelector
            title={'Meu gênero'}
            data={Options?.genderOptions()}
            selectedItem={gender}
            handleChange={(selectedItem: any) => setGender(selectedItem)}
        />

        <ModalSelector
            title={'Procuro por'}
            data={Options?.searchingByOptions()}
            selectedItem={searchingBy}
            handleChange={(selectedItem: any) => setSearchingBy(selectedItem)}
        />

        <MultiSlider
            title={'Faixa etária'}
            values={ageRange}
            onValuesChange={(value: number[]) => setAgeRange([value[0], value[1]])}
            min={18}
            max={55}
        />

        <MultiSlider
            title={'Distância máxima'}
            values={maxDistance}
            rightText={'km'}
            onValuesChange={(value: number[]) => setMaxDistance(value)}
            min={2}
            max={500}
        />

        <TextInputRightIconButton
            reference={tiPassword}
            placeholder={'Senha'}
            showRightButton
            solidIcon
            returnKeyType={'next'}
            value={password}
            onChangeText={(value) => setPassword(value)}
            customIconStyle={{ color: $gray }}
            iconName={passwordSecureTextEntry ? 'eye' : 'eye-slash'}
            secureTextEntry={passwordSecureTextEntry}
            underlayColor={$lightGray}
            onButtonPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
            onSubmitEditing={() => tiPasswordConfirmation?.current?.focus()}
        />

        <TextInputRightIconButton
            reference={tiPasswordConfirmation}
            placeholder={'Repetir senha'}
            showRightButton
            solidIcon
            value={passwordConfirmation}
            onChangeText={(value) => setPasswordConfirmation(value)}
            customIconStyle={{ color: $gray }}
            iconName={passwordConfirmationSecureTextEntry ? 'eye' : 'eye-slash'}
            secureTextEntry={passwordConfirmationSecureTextEntry}
            underlayColor={$lightGray}
            onButtonPress={() => setPasswordConfirmationSecureTextEntry(!passwordConfirmationSecureTextEntry)}
        />

        <GenericAppButton
            customButtonStyle={{ margin: 30, width: 'auto' }}
            textButton={'ENVIAR'}
            onPress={createNewAccount}
        />

    </MainContainer>
}

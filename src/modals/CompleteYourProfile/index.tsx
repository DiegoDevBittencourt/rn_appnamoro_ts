import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

import * as userThunk from '~/store/users/thunk';
import * as Options from '~/utils/options';
import { dangerNotification } from '~/utils/notifications';
import { handleUserBirthday, convertDateStringFromDDMMYYYYtoMMDDYYYY } from '~/utils/functions';
import { MainContainer } from './styles';
import { useUsers } from '~/store/users/reducer';
import {
    TextInputRightIconButton,
    DatePickerButton,
    ModalSelector,
    GenericAppButton,
    GenericModalContainer,
} from '@components/index';

const CompleteYourProfileContent = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { userData } = useSelector(useUsers);

    const [birthdayLocal, setBirthdayLocal] = useState<any>();
    const [genderLocal, setGenderLocal] = useState<any>(null);
    const [searchingByLocal, setSearchingByLocal] = useState<any>(null);
    const [schoolingLocal, setSchoolingLocal] = useState<any>(null);
    const [phoneLocal, setPhoneLocal] = useState<string | undefined>('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');

    const tiCompany = useRef<any>();
    const tiPosition = useRef<any>();

    useEffect(() => {
        const { birthday, gender, searchingBy, phone } = userData;

        setBirthdayLocal(handleUserBirthday(birthday));

        setGenderLocal(gender);
        setSearchingByLocal(searchingBy);
        setPhoneLocal(phone);
    }, [userData]);

    useEffect(() => {
        // BackHandler.addEventListener('hardwareBackPress', handleCloseButtonPress);

        // return () => {
        //     BackHandler.removeEventListener('hardwareBackPress', handleCloseButtonPress);
        // }
    }, []);

    const updateUserInfo = async () => {
        if (birthdayLocal && genderLocal && searchingByLocal && schoolingLocal && position) {

            const userData = ({
                birthday: convertDateStringFromDDMMYYYYtoMMDDYYYY(birthdayLocal),
                gender: genderLocal.key,
                searchingBy: searchingByLocal.key,
                schooling: schoolingLocal.key,
                phone: phoneLocal,
                company,
                position,
                profileComplete: 1,
                showMeOnApp: 1
            });

            // dispatch(userThunk.updateUser(userData, true)).then(() => navigation.goBack());
        }
        else dangerNotification('"Dt. de nascimento", "Gênero", "Procuro por", "Escolaridade" e "Cargo" são campos obrigatórios.');
    }

    const handleCloseButtonPress = () => {
        // dispatch(authThunk.signOut());
    }

    return <GenericModalContainer closeButtonPress={() => handleCloseButtonPress()} title={'Vamos completar seu perfil!'}>
        <MainContainer>

            <DatePickerButton
                selectedDate={birthdayLocal}
                updateSelectedDate={(selectedDate: Date) => setBirthdayLocal(selectedDate)}
            />

            <ModalSelector
                title={'Meu gênero'}
                data={Options.genderOptions()}
                selectedItem={genderLocal}
                handleChange={(selectedItem: any) => setGenderLocal(selectedItem)}
            />

            <ModalSelector
                title={'Procuro por'}
                data={Options.searchingByOptions()}
                selectedItem={searchingByLocal}
                handleChange={(selectedItem: any) => setSearchingByLocal(selectedItem)}
            />

            <ModalSelector
                title={'Escolaridade'}
                data={Options.schoolingOptions()}
                selectedItem={schoolingLocal}
                handleChange={(selectedItem: any) => setSchoolingLocal(selectedItem)}
            />

            <TextInputRightIconButton
                placeholder={'Telefone'}
                keyboardType={'number-pad'}
                value={phoneLocal}
                returnKeyType={'next'}
                onChangeText={(value) => setPhoneLocal(value)}
                onSubmitEditing={() => tiCompany.current.focus()}
            />

            <TextInputRightIconButton
                reference={tiCompany}
                placeholder={'Empresa onde trabalha'}
                value={company}
                returnKeyType={'next'}
                onChangeText={(value) => setCompany(value)}
                onSubmitEditing={() => tiPosition.current.focus()}
            />

            <TextInputRightIconButton
                reference={tiPosition}
                placeholder={'Cargo'}
                value={position}
                onChangeText={(value) => setPosition(value)}
            />

            <GenericAppButton
                customButtonStyle={{ margin: 30, width: 'auto' }}
                textButton={'CONTINUAR'}
                onPress={() => updateUserInfo()}
            />

        </MainContainer>
    </GenericModalContainer>
}

export default CompleteYourProfileContent;

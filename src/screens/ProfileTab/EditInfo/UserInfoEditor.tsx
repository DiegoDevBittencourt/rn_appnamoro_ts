import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// import * as userThunk from '~/store/users/thunk';
import * as Options from '~/utils/options';
import { handleUserBirthday, convertDateStringFromDDMMYYYYtoMMDDYYYY } from '~/utils/functions';
import { useUsers } from '~/store/users/reducer';
import {
    TextInputRightIconButton,
    DatePickerButton,
    ModalSelector,
    GenericAppButton,
    SectionTitle,
} from '@components/index';
import { UserInfoEditorContainer } from './styles';

export default function UserInfoEditor() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { userData } = useSelector(useUsers);
    const { firstName, lastName } = userData;

    const [aboutLocal, setAboutLocal] = useState<string>();
    const [birthdayLocal, setBirthdayLocal] = useState<any>();
    const [genderLocal, setGenderLocal] = useState<any>();
    const [schoolingLocal, setSchoolingLocal] = useState();
    const [companyLocal, setCompanyLocal] = useState<any>();
    const [positionLocal, setPositionLocal] = useState<any>();

    const tiCompany = useRef<any>();
    const tiPosition = useRef<any>();

    useEffect(() => {

        const { about, birthday, gender, schooling, company, position } = userData;

        setAboutLocal(about);

        setBirthdayLocal(handleUserBirthday(birthday));

        setGenderLocal(gender);
        setSchoolingLocal(schooling);
        setCompanyLocal(company);
        setPositionLocal(position);
    }, [userData]);

    const updateUserInfo = async () => {
        const user = ({
            about: aboutLocal,
            birthday: convertDateStringFromDDMMYYYYtoMMDDYYYY(birthdayLocal),
            gender: genderLocal.key,
            company: companyLocal,
            position: positionLocal
        });

        // dispatch(userThunk.updateUser(user, true)).then(() => navigation.goBack());
    }

    return <UserInfoEditorContainer>

        <SectionTitle titleText={`SOBRE ${firstName.toUpperCase()} ${lastName.toUpperCase()}`} />
        <TextInputRightIconButton
            placeholder={'Escreva algo sobre você'}
            value={aboutLocal}
            returnKeyType={'next'}
            multiline
            onChangeText={(value) => setAboutLocal(value)}
            customContainerStyle={{ height: 200 }}
            textAlignVertical='top'
        />

        <SectionTitle titleText='DATA DE NASCIMENTO' />
        <DatePickerButton
            selectedDate={birthdayLocal}
            updateSelectedDate={(selectedDate: any) => setBirthdayLocal(selectedDate)}
        />

        <ModalSelector
            title={'Meu gênero'}
            data={Options.genderOptions()}
            selectedItem={genderLocal}
            handleChange={(selectedItem: any) => setGenderLocal(selectedItem)}
        />

        <ModalSelector
            title={'Escolaridade'}
            data={Options.schoolingOptions()}
            selectedItem={schoolingLocal}
            handleChange={(selectedItem: any) => setSchoolingLocal(selectedItem)}
        />

        <SectionTitle titleText='EMPRESA ONDE TRABALHA' />
        <TextInputRightIconButton
            reference={tiCompany}
            placeholder={'Empresa onde trabalha'}
            value={companyLocal}
            returnKeyType={'next'}
            onChangeText={(value) => setCompanyLocal(value)}
            onSubmitEditing={() => tiPosition.current.focus()}
        />

        <SectionTitle titleText='CARGO' />
        <TextInputRightIconButton
            reference={tiPosition}
            placeholder={'Cargo'}
            value={positionLocal}
            onChangeText={(value) => setPositionLocal(value)}
        />

        <GenericAppButton
            customButtonStyle={{ margin: 30 }}
            textButton={'SALVAR'}
            onPress={updateUserInfo}
        />

    </UserInfoEditorContainer>
}

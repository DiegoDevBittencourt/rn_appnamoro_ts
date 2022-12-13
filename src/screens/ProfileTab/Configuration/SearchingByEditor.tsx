import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

// import * as userThunk from '~/store/users/thunk';
import { P, ConfigItem, GenericScrollView, SectionTitle, Toolbar } from '@components/index';
import { useUsers } from '~/store/users/reducer';
import { theme } from '~/constants/StyledComponentsTheme';
import { MainContainer } from './styles';
import { useDashboard } from '~/store/dashboard/reducer';

const PCustom = styled(P)`
    margin-top: 15px;
    margin-left: 10px;
`;

const SearchingByEditor = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { userData } = useSelector(useUsers);
    const { selectedConfigMenu, selectedConfigMenuTitle } = useSelector(useDashboard);

    const { key: searchingBy } = userData?.searchingBy || { key: 0 };

    const updateSearchingBy = (value: number) => {
        // dispatch(userThunk.updateUser({ searchingBy: value }, true, true));
    }

    const InfoText = () => {
        switch (searchingBy) {
            case 0:
                return <PCustom>{'Você só verá homens na Descoberta'}</PCustom>;
            case 1:
                return <PCustom>{'Você só verá mulheres na Descoberta'}</PCustom>;
            default:
                return <PCustom>{'Você verá todos na Descoberta'}</PCustom>;
        }
    }

    return <MainContainer>

        <Toolbar
            onLeftElementPress={() => navigation?.goBack()}
            title={'Procurando por'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <SectionTitle titleText={selectedConfigMenuTitle} />

        <GenericScrollView style={{ marginTop: 10 }}>

            <ConfigItem
                leftText={'HOMENS'}
                rightIconName={searchingBy == 0 ? 'check' : 'none'}
                onPress={() => updateSearchingBy(0)}
            />

            <ConfigItem
                leftText='MULHERES'
                rightIconName={searchingBy == 1 ? 'check' : 'none'}
                onPress={() => updateSearchingBy(1)}
            />

            <ConfigItem
                leftText='TODOS'
                rightIconName={searchingBy == 2 ? 'check' : 'none'}
                onPress={() => updateSearchingBy(2)}
            />

            <InfoText />

        </GenericScrollView>

    </MainContainer>
}

export default SearchingByEditor;

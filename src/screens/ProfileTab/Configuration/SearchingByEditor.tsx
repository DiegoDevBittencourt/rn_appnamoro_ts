import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useUsers } from '~/store/users/reducer';
import { theme } from '~/constants/styledComponentsTheme';
import { MainContainer, PCustomSearchingBy } from './styles';
import { useDashboard } from '~/store/dashboard/reducer';
import { updateUser } from '~/store/users/thunk';
import {
    ConfigItem,
    GenericScrollView,
    SectionTitle,
    Toolbar
} from '@components/index';

const SearchingByEditor = () => {

    const dispatch = useDispatch<any>();
    const navigation = useNavigation();

    const { userData } = useSelector(useUsers);
    const { selectedConfigMenuTitle } = useSelector(useDashboard);

    const { searchingBy } = userData;

    useEffect(() => {
        console.log('userData123123', userData);
        console.log('searchingBy', searchingBy);
    }, [userData, searchingBy]);

    const updateSearchingBy = (value: number) => {
        dispatch(updateUser({
            user: { searchingBy: value },
            shouldShowLoader: true,
            shouldCleanMatchSearcherArrayAndGetNextProfile: true
        }));
    }

    const InfoText = () => {
        switch (searchingBy?.key) {
            case 0:
                return <PCustomSearchingBy>{'Você só verá homens na Descoberta'}</PCustomSearchingBy>;
            case 1:
                return <PCustomSearchingBy>{'Você só verá mulheres na Descoberta'}</PCustomSearchingBy>;
            default:
                return <PCustomSearchingBy>{'Você verá todos na Descoberta'}</PCustomSearchingBy>;
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
                rightIconName={searchingBy?.key == 0 ? 'check' : 'none'}
                onPress={() => updateSearchingBy(0)}
            />

            <ConfigItem
                leftText='MULHERES'
                rightIconName={searchingBy?.key == 1 ? 'check' : 'none'}
                onPress={() => updateSearchingBy(1)}
            />

            <ConfigItem
                leftText='TODOS'
                rightIconName={searchingBy?.key == 2 ? 'check' : 'none'}
                onPress={() => updateSearchingBy(2)}
            />

            <InfoText />

        </GenericScrollView>

    </MainContainer>
}

export default SearchingByEditor;

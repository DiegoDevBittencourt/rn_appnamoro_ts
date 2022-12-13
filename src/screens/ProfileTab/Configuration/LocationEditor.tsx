import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { AwesomeIcon, GenericScrollView, SectionTitle, Toolbar } from '@components/index';
import { theme } from '~/constants/StyledComponentsTheme';
import { useUsers } from '~/store/users/reducer';
import { AddressInfo, MainContainer, MyLocationContainer, PCustom, PTitle } from './styles';
import { useDashboard } from '~/store/dashboard/reducer';

const LocationEditor = () => {

    const navigation = useNavigation();
    const { selectedConfigMenuTitle } = useSelector(useDashboard);

    const { userData } = useSelector(useUsers);
    const { address } = userData;

    return <MainContainer>

        <Toolbar
            onLeftElementPress={() => navigation?.goBack()}
            title={'Localização'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <SectionTitle titleText={selectedConfigMenuTitle} />

        <GenericScrollView style={{ marginTop: 10 }}>

            <AddressInfo>

                <AwesomeIcon customIconStyle={{ color: theme.$blue }} iconName='map-marker-alt' />

                <MyLocationContainer>
                    <PTitle>Minha Localização atual</PTitle>
                    <PCustom>{address ? address : 'Não definida'}</PCustom>
                </MyLocationContainer>

            </AddressInfo>

        </GenericScrollView>

    </MainContainer>
}

export default LocationEditor;

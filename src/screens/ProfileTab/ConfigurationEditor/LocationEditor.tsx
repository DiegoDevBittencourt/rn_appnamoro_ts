import React from 'react';
import { useSelector } from 'react-redux';

import { theme } from '@constants/StyledComponentsTheme';
import { GenericScrollView, AwesomeIcon } from '@components/index';
import { AddressInfo, MyLocationContainer, PCustom, PTitle } from './styles';
import { useUsers } from '~/store/users/reducer';

const LocationEditor = () => {

    const { userData } = useSelector(useUsers);
    const { address } = userData;

    const AddressComponent = () => {
        return <AddressInfo>

            <AwesomeIcon customIconStyle={{ color: theme.$blue }} iconName='map-marker-alt' />

            <MyLocationContainer>
                <PTitle>Minha Localização atual</PTitle>
                <PCustom>{address ? address : 'Não definida'}</PCustom>
            </MyLocationContainer>

        </AddressInfo>
    }

    return <GenericScrollView customStyle={{ marginTop: 10 }}>

        <AddressComponent />

    </GenericScrollView>
}

export default LocationEditor;

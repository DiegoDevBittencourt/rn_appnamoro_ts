import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { GenericContainer, SectionTitle } from '@components/index';
import EmailEditor from './EmailEditor';
import PhoneEditor from './PhoneEditor';
import LocationEditor from './LocationEditor';
import SearchingByEditor from './SearchingByEditor';
import ConfigToolbar from '@screens/ProfileTab/Configuration/ConfigToolbar';
import { useDashboard } from '~/store/dashboard/reducer';

const MainContainer = styled(GenericContainer)`
    background-color: ${({ theme }) => theme.$darkerBackgroundColor};
`;

const ConfigurationEditor = () => {

    const { selectedConfigMenu, selectedConfigMenuTitle } = useSelector(useDashboard);

    const RenderBody = () => {
        switch (selectedConfigMenu) {
            case 'emailEditor':
                return <EmailEditor />
            case 'phoneEditor':
                return <PhoneEditor />
            case 'locationEditor':
                return <LocationEditor />
            case 'searchingByEditor':
                return <SearchingByEditor />
            default:
                return null;
        }
    }

    return <MainContainer>

        <ConfigToolbar />

        <SectionTitle titleText={selectedConfigMenuTitle} />

        <RenderBody />

    </MainContainer>
}

export default ConfigurationEditor;

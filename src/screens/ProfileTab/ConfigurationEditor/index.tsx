import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { SectionTitle, Toolbar } from '@components/index';
import EmailEditor from './EmailEditor';
import PhoneEditor from './PhoneEditor';
import LocationEditor from './LocationEditor';
import SearchingByEditor from './SearchingByEditor';
import { useDashboard } from '~/store/dashboard/reducer';
import { MainContainer } from './styles';
import { theme } from '~/constants/StyledComponentsTheme';

const ConfigurationEditor = () => {

    const navigation = useNavigation();
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

        <Toolbar
            onLeftElementPress={() => navigation?.goBack()}
            title={'Configurações'}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <SectionTitle titleText={selectedConfigMenuTitle} />

        <RenderBody />

    </MainContainer>
}

export default ConfigurationEditor;

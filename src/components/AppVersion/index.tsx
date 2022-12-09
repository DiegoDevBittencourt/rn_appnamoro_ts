import React from 'react';

import appIcon from '@assets/appIcon.png'
import P from '../P';
import { AppIcon, AppVersionContainer } from './styles';

const AppVersion = () => {
    return <AppVersionContainer>

        <AppIcon source={appIcon} />

        <P style={{ padding: 5 }}>{'Versão 1.0.0'}</P>

    </AppVersionContainer>
}

export default AppVersion;

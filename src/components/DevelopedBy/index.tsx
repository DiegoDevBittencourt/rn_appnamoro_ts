import React from 'react';

import AwesomeIcon from '../AwesomeIcon';
import { theme } from '@constants/StyledComponentsTheme';
import { DevelopedByContainer, P1, P2, P3 } from './styles';

const DevelopedBy = () => {
    return <DevelopedByContainer>

        <P2>{'DESENVOLVIDO POR'}</P2>

        <P1>
            {'DIEGO DEV BITTENCOURT'}
            <AwesomeIcon
                customIconContainer={{ height: 12, width: 30 }}
                iconName={'vr-cardboard'}
                customIconStyle={{ color: theme.$primaryColor, marginLeft: 3 }}
            />
        </P1>

        <P3>{'DIEGO6D@GMAIL.COM'}</P3>

    </DevelopedByContainer>
}

export default DevelopedBy;

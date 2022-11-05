import React from 'react';
import { AwesomeIconType } from './interface';
import { Awesome5Icon, EvilIcon, IconContainer } from './styles';

const AwesomeIcon = ({ customIconContainer, evilIcon, iconName, customIconStyle, solidIcon }: AwesomeIconType) => {
    return <IconContainer style={customIconContainer}>
        {
            evilIcon ?
                <EvilIcon name={iconName || ''} style={customIconStyle} />
                : <Awesome5Icon name={iconName || ''} style={customIconStyle} solid={solidIcon} />
        }
    </IconContainer>
}

export default AwesomeIcon;

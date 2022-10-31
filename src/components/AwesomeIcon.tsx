import React from 'react';
import styled from 'styled-components/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { ViewStyle } from 'react-native';

const Awesome5Icon = styled(FontAwesome)`
    font-size: 18px;
`;

const EvilIcon = styled(EvilIcons)`
    font-size: 18px;
`;

const IconContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: ${({ theme }) => theme.$heightOfGenericComponent}px;
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
`;

interface AwesomeIconType {
    customIconContainer: ViewStyle,
    evilIcon: boolean,
    iconName: string,
    customIconStyle: ViewStyle,
    solidIcon: boolean
}

const AwesomeIcon = ({ customIconContainer, evilIcon, iconName, customIconStyle, solidIcon }: AwesomeIconType) => {
    return <IconContainer style={customIconContainer}>
        {
            evilIcon ?
                <EvilIcon name={iconName} style={customIconStyle} />
                : <Awesome5Icon name={iconName} style={customIconStyle} solid={solidIcon} />
        }
    </IconContainer>
}

export default AwesomeIcon;

import React from 'react';
import styled from 'styled-components';

import { theme } from '@constants/StyledComponentsTheme';
import AwesomeIcon from './AwesomeIcon';

const Button = styled.TouchableHighlight`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: ${({ theme }) => theme.$heightOfGenericComponent}px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: ${({ theme }) => theme.$bigBorderRadius}px;
    align-self: flex-end;
`;

export default RoundCloseButton = ({ customButtonStyle, onPress, customIconStyle }) => {
    return <Button style={customButtonStyle} underlayColor={theme.$lightGray} onPress={onPress}>
        <AwesomeIcon customIconStyle={{ color: theme.$textColor, ...customIconStyle }} iconName={'times'} />
    </Button>
}

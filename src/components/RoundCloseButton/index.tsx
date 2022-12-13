import React from 'react';

import { theme } from '@constants/styledComponentsTheme';
import AwesomeIcon from '../AwesomeIcon';
import { Button } from './styles';
import { RoundCloseButtonType } from './interface';

const RoundCloseButton = (props: RoundCloseButtonType) => {

    const { customButtonStyle, onPress, customIconStyle } = props;

    return <Button style={customButtonStyle} underlayColor={theme.$lightGray} onPress={onPress}>
        <AwesomeIcon customIconStyle={{ color: theme.$textColor, ...customIconStyle }} iconName={'times'} />
    </Button>
}

export default RoundCloseButton;

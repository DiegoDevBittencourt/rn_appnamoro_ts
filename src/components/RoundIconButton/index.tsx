import React from 'react';

import AwesomeIcon from '../AwesomeIcon';
import { RoundIconButtonType } from './interface';
import { Button, IconContainer } from './styles';

const RoundIconButton = (props: RoundIconButtonType) => {

    const { underlayColor, customButtonStyle, onPress, customIconStyle } = props;

    return <Button onPress={onPress} underlayColor={underlayColor} style={customButtonStyle}>

        <IconContainer>
            <AwesomeIcon {...props} customIconStyle={customIconStyle} />
        </IconContainer>

    </Button>
}

export default RoundIconButton;

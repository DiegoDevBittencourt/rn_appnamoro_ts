import React from 'react';

import AwesomeIcon from '../AwesomeIcon';
import TextInput from '../TextInput';
import { Button, MainContainer } from './styles';
import { TextInputRightIconButtonType } from './interface';

const TextInputRightIconButton = (props: TextInputRightIconButtonType) => {

    const {
        showRightButton,
        customButtonStyle,
        underlayColor,
        customContainerStyle,
        onButtonPress,
        reference
    } = props;

    return <MainContainer style={customContainerStyle}>
        <TextInput
            {...props}
            ref={reference}
        />

        {
            showRightButton &&
            <Button
                style={customButtonStyle}
                underlayColor={underlayColor}
                onPress={onButtonPress}>
                <AwesomeIcon {...props} />
            </Button>
        }
    </MainContainer >
}

export default TextInputRightIconButton;

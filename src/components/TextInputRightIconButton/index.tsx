import React from 'react';

import AwesomeIcon from '../AwesomeIcon';
import TextInput from '../TextInput';
import { ViewStyle } from 'react-native';
import { Button, MainContainer } from './style';
import { TextInputRightIconButtonType } from './interface';

const TextInputRightIconButton = (props: TextInputRightIconButtonType) => {

    const {
        placeholder,
        value,
        onChangeText,
        secureTextEntry,
        returnKeyType,
        onSubmitEditing,
        keyboardType,
        reference,
        showRightButton,
        customButtonStyle,
        underlayColor,
        multiline,
        customContainerStyle,
        customInputStyle,
        textAlignVertical,
        onButtonPress
    } = props;

    return <MainContainer style={customContainerStyle}>
        <TextInput
            reference={reference}
            style={customInputStyle}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            multiline={multiline}
            textAlignVertical={textAlignVertical}
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

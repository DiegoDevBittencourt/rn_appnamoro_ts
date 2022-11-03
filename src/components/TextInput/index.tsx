import React from 'react';
import { TextInputType } from './interface';
import { Input } from './style';

const TextInput = (props: any) => {
    const {
        reference,
        placeholder,
        value,
        onChangeText,
        secureTextEntry,
        returnKeyType,
        onSubmitEditing,
        keyboardType,
        multiline,
        customInputStyle,
        textAlignVertical
    } = props;

    return <Input
        {...props}
        ref={reference}
        style={customInputStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
    // onSubmitEditing={onSubmitEditing}
    // keyboardType={keyboardType}
    // multiline={multiline}
    // textAlignVertical={textAlignVertical}
    />
}

export default TextInput;

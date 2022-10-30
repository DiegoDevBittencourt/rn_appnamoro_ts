import React from 'react';
import styled from 'styled-components';

const Input = styled.TextInput`
    flex: 1;
    margin-left: 3px;
    margin-right: 3px;
    height: 100%;
    background-color: white;
    border-width: 1px;
    border-color: ${({ theme }) => theme.$lightGray};
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    padding-left: 10px;
    color: ${({ theme }) => theme.$textColor};
`;

export default TextInput = (props) => {

    const {
        placeholder,
        value,
        onChangeText,
        secureTextEntry,
        returnKeyType,
        onSubmitEditing,
        keyboardType,
        reference,
        multiline,
        customInputStyle,
        textAlignVertical
    } = props;

    return <Input
        ref={reference}
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
}

import React from 'react';
import { Input } from './styles';

const TextInput = (props: any) => {
    return <Input ref={props?.reference} {...props} />
}

export default TextInput;

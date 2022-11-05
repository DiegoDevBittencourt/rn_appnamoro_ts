import React from 'react';
import { Text } from './styles';

const P = (props: any) => {
    return <Text {...props}>{props.children}</Text>
}

export default P;

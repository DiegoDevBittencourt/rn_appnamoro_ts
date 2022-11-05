import React from 'react';
import { Text } from './styles';

const H2 = (props: any) => {
    return <Text {...props}>{props.children}</Text>
}

export default H2;

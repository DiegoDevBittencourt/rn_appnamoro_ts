import React from 'react';
import { Text } from './styles';

const H3 = (props: any) => {
    return <Text {...props}>{props.children}</Text>
}

export default H3;

import React from 'react';
import { Text } from './style';

const H2 = (props: any) => {
    return <Text {...props}>{props.children}</Text>
}

export default H2;

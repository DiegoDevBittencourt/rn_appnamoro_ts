import React from 'react';
import styled from 'styled-components/native';

const Text = styled.Text`
    font-weight: 100;
    font-size: 25px;
    color: ${({ theme }) => theme.$textColor};
`;

const H2 = (props: any) => {
    return <Text {...props}>{props.children}</Text>
}

export default H2;

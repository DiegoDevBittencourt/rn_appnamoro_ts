import React from 'react';
import { MainContainer } from './styles';

const GenericContainer = (props: any) => {
    return <MainContainer {...props}>{props?.children}</MainContainer>
}

export default GenericContainer;

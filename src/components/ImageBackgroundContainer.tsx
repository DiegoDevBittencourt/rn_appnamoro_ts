import React from 'react';
import styled from 'styled-components/native';

const ImageBackground = styled.ImageBackground`
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
`;

interface Payload {
    source: any,
    children: any;
}

const ImageBackgroundContainer = ({ source, children }: Payload) => {
    return <ImageBackground source={source}>
        {children}
    </ImageBackground>
}

export default ImageBackgroundContainer;

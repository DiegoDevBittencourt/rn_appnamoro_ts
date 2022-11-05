import React from 'react';
import { ImageBackgroundContainerType } from './interface';
import { ImageBackground } from './styles';

const ImageBackgroundContainer = ({ source, children }: ImageBackgroundContainerType) => {
    return <ImageBackground source={source}>
        {children}
    </ImageBackground>
}

export default ImageBackgroundContainer;

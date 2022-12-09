import React from 'react';

import { RoundImageType } from './interface';
import { Image } from './styles';

const RoundImage = ({ source, customImageStyle }: RoundImageType) => {
    return <Image style={customImageStyle} source={source} />
}

export default RoundImage;

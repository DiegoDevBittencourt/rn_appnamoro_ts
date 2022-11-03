import React from 'react';
import { AppLogoType } from './interface';
import { AppLogoImage } from './style';

const AppLogo = ({ source }: AppLogoType) => {
    return <AppLogoImage source={source} />
}

export default AppLogo;

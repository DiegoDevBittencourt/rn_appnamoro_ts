import React from 'react';
import { AppLogoImage } from './styles';

const AppLogo = (props: any) => {
    return <AppLogoImage {...props} source={props?.source} />
}

export default AppLogo;

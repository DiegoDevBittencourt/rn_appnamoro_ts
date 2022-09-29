import React from 'react';

import logo from '../../assets/logo.png';
import appBackgroundOpaque from '@assets/appBackgroundOpaque.jpg';
// import LoginCard from './LoginCard';
import { ImageBackgroundContainer, AppLogo } from '@components/index';

export default function Login(/*props*/) {
    return <ImageBackgroundContainer source={appBackgroundOpaque}>

        <AppLogo source={logo} />

        {/* <LoginCard {...props} /> */}

    </ImageBackgroundContainer>
}
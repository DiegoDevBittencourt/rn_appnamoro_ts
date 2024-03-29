import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import logo from '@assets/logo.png';
import appBackgroundOpaque from '@assets/appBackgroundOpaque.jpg';
import LoginCard from './LoginCard';
import { ImageBackgroundContainer, AppLogo, GenericScrollView } from '@components/index';
import { cardContainerStyle } from './styles';

export default function Login() {

    const [adjustmentMargin, setAdjustmentMargin] = useState(0);

    useEffect(() => {
        const marginTop = (Dimensions.get('window').height - cardContainerStyle?.loginCardContainer?.height) / 4;
        setAdjustmentMargin(marginTop > 0 ? marginTop : 0);
    }, [])

    return <ImageBackgroundContainer source={appBackgroundOpaque}>

        <GenericScrollView style={{ backgroundColor: 'transparent', marginTop: adjustmentMargin }} >

            <AppLogo source={logo} />
            <LoginCard />

        </GenericScrollView>

    </ImageBackgroundContainer>
}

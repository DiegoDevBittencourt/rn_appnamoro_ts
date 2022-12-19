import React from 'react';
import { TouchableOpacity } from 'react-native';

import { H3 } from '@components/index';
import { theme } from '@constants/styledComponentsTheme';

const ControlButton = (props: any) => {

    const { style, textButton } = props;

    return <TouchableOpacity
        {...props}
        style={{
            backgroundColor: theme?.$opaqueBlackBackgroundColor,
            height: '100%',
            width: 75,
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: theme?.$bigBorderRadius,
            borderBottomRightRadius: theme?.$bigBorderRadius
            , ...style
        }}>
        <H3 style={{
            color: 'white',
            fontSize: 22
        }}>{textButton}</H3>
    </TouchableOpacity>
}

export default ControlButton;

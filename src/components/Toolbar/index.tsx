import React from 'react';
import { Appbar } from 'react-native-paper';

import { theme } from '~/constants/StyledComponentsTheme';
import { ToolbarType } from './interface';

const Toolbar = (props: ToolbarType) => {

    const {
        onLeftElementPress,
        rightElementIconName,
        onRightElementPress,
        title,
        customContainerStyle,
        customTitleStyle,
        iconsColor
    } = props;

    return <Appbar.Header style={{ height: 48, backgroundColor: theme.$primaryColor, ...customContainerStyle }}>
        <Appbar.BackAction iconColor={iconsColor || 'white'} onPress={onLeftElementPress} />
        <Appbar.Content titleStyle={{ color: 'white', ...customTitleStyle }} title={title} />
        <Appbar.Action iconColor={iconsColor || 'white'} icon={rightElementIconName} onPress={onRightElementPress} />
    </Appbar.Header>
}

export default Toolbar;

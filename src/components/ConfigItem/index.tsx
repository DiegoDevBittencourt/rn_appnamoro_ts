import React from 'react';
import { Switch } from 'react-native';

import { theme } from '@constants/StyledComponentsTheme';
import { Awesome5Icon, Button, ButtonContainer, LeftText, RightText } from './styles';
import { ConfigItemType } from './interface';

const ConfigItem = ({
    leftText,
    rightText,
    onPress,
    isThisSwitch,
    isSwitchOn,
    handleSwitchChange,
    customButtonStyle,
    rightIconName
}: ConfigItemType) => {

    const { $primaryColor, $lightGray, $gray } = theme;

    const RightElement = () => {
        return isThisSwitch ?
            <Switch
                trackColor={{ false: $gray, true: $gray }}
                thumbColor={isSwitchOn ? $primaryColor : $lightGray}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleSwitchChange}
                value={isSwitchOn}
            />
            :
            <ButtonContainer>
                <RightText>{rightText}</RightText>
                {rightIconName != 'none' && <Awesome5Icon name={rightIconName ? rightIconName : 'chevron-right'} />}
            </ButtonContainer>
    }

    const LeftElement = () => <LeftText>{leftText}</LeftText>

    return <Button style={customButtonStyle} underlayColor={$lightGray} onPress={onPress}>
        <ButtonContainer>

            <LeftElement />

            <RightElement />

        </ButtonContainer>
    </Button>
}

export default ConfigItem;

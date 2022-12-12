import React from 'react';

import { theme } from '@constants/StyledComponentsTheme';
import { Button, ButtonText, Gradient } from './styles';
import { GenericAppButtonType } from './interface';

const GenericAppButton = (props: GenericAppButtonType) => {

    const { customButtonStyle, underlayColor, onPress, textButton, enable } = props;

    const { $lightGray, $degradeColor_1, $degradeColor_2 } = theme;

    return <Button
        style={{ backgroundColor: !enable ? $lightGray : '', ...customButtonStyle }}
        underlayColor={!enable ? $lightGray : underlayColor}
        onPress={onPress}
    >
        {
            !enable && enable != undefined ?
                <ButtonText>{textButton}</ButtonText>
                :
                <Gradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[$degradeColor_1, $degradeColor_2]}>
                    <ButtonText>{textButton}</ButtonText>
                </Gradient>
        }
    </Button>
}

export default GenericAppButton;

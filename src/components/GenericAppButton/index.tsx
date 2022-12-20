import React from 'react';

import AwesomeIcon from '../AwesomeIcon';
import { theme } from '@constants/styledComponentsTheme';
import { Button, ButtonContainer, ButtonText, Gradient, IconContainer } from './styles';

const GenericAppButton = (props: any) => {

    const {
        customButtonStyle,
        underlayColor,
        onPress,
        textButton,
        enable,
        iconName,
    } = props;

    const { $lightGray, $degradeColor_1, $degradeColor_2 } = theme;

    return <Button
        style={{ backgroundColor: !enable ? $lightGray : '', ...customButtonStyle }}
        underlayColor={!enable ? $lightGray : underlayColor}
        onPress={onPress}
    >
        {
            ((!enable && enable != undefined) || customButtonStyle?.backgroundColor) ?
                <ButtonContainer>
                    {iconName && <IconContainer>
                        <AwesomeIcon {...props} customIconStyle={{ color: 'white' }} />
                    </IconContainer>}

                    <ButtonText>{textButton}</ButtonText>
                </ButtonContainer>
                :
                <Gradient style={{ flexDirection: 'row' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[$degradeColor_1, $degradeColor_2]}>

                    {iconName && <IconContainer>
                        <AwesomeIcon {...props} customIconStyle={{ color: 'white' }} />
                    </IconContainer>}

                    <ButtonText>{textButton}</ButtonText>
                </Gradient>
        }
    </Button>
}

export default GenericAppButton;

import React from 'react';
import styled from 'styled-components/native';

import AwesomeIcon from '../AwesomeIcon';
import { Button, ButtonContainer, ButtonText, IconContainer } from './styles';

const SocialButton = (props: any) => {
    return <Button style={props.customButtonStyle} underlayColor={props.underlayColor} onPress={() => props.onPress()}>
        <ButtonContainer>

            <IconContainer>
                <AwesomeIcon {...props} customIconStyle={{ color: 'white' }} />
            </IconContainer>

            <ButtonText>
                {'Entrar com '}
                <ButtonText style={{ fontWeight: 'bold' }}>{props.text}</ButtonText>
            </ButtonText>

        </ButtonContainer>
    </Button>
}

export default SocialButton

import React from 'react';
import styled from 'styled-components/native';

import GenericRowView from './GenericRowView';
import AwesomeIcon from './AwesomeIcon';

const ButtonContainer = styled(GenericRowView)`
    align-items: center;
`;

const Button = styled.TouchableHighlight`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: 100%;
    justify-content: center;
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    margin-top: 10px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;

const IconContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${({ theme }) => theme.$heightOfGenericComponent + 10}px;
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
`;

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
// const Text = styled.Text`
//     font-weight: 100;
//     font-size: 25px;
//     color: ${({ theme }) => theme.$textColor};
// `;

// const H2 = (props: any) => {
//     return <Text {...props}>{props.children}</Text>
// }

// export default H2;

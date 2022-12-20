import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Button = styled.TouchableHighlight`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: 100%;
    max-width: 350px;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.$bigBorderRadius}px;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;

export const Gradient = styled(LinearGradient)`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.$bigBorderRadius}px;
`;

export const ButtonContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;

export const IconContainer = styled.View`
    position: absolute;
    left: 15;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${({ theme }) => theme.$heightOfGenericComponent + 10}px;
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
`;

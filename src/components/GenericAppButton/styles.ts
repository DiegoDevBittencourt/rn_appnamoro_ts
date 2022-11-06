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
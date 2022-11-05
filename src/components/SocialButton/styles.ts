import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const Button = styled.TouchableHighlight`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: 100%;
    justify-content: center;
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    margin-top: 10px;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;

export const IconContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${({ theme }) => theme.$heightOfGenericComponent + 10}px;
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
`;

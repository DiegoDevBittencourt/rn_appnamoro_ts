import styled from 'styled-components/native';

export const Button = styled.TouchableHighlight`
    height: 60px;
    width: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background-color: white;
    elevation: 3;
`;

export const IconContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${({ theme }) => theme.$heightOfGenericComponent + 10}px;
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
`;

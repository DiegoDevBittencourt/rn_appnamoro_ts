import styled from 'styled-components/native';

export const MainContainer = styled.View`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: 100%;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.$lightGray};
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    padding: 0.5px;
    align-items: center;
    align-self: center;
    flex-direction: row;
`;

export const Button = styled.TouchableHighlight`
    height: 100%;
    width: ${({ theme }) => theme.$heightOfGenericComponent}px;
    justify-content: center;
    background-color: ${({ theme }) => theme.$lightGray};
    border-top-right-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    border-bottom-right-radius: ${({ theme }) => theme.$smallBorderRadius}px;
`;

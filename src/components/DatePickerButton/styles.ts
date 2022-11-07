import styled from 'styled-components/native';

export const MainContainer = styled.View`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: 100%;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.$lightGray};
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    padding: 1px 4px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const Button = styled.TouchableHighlight`
    height: 100%;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    background-color: white;
    border-top-right-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    border-bottom-right-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    padding-left: 9px;
`;

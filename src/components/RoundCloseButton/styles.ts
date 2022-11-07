import styled from 'styled-components/native';

export const Button = styled.TouchableHighlight`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: ${({ theme }) => theme.$heightOfGenericComponent}px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: ${({ theme }) => theme.$bigBorderRadius}px;
    align-self: flex-end;
`;

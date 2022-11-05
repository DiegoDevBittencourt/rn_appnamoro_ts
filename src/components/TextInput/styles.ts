import styled from 'styled-components/native';

export const Input = styled.TextInput`
    flex: 1;
    margin-left: 3px;
    margin-right: 3px;
    height: 100%;
    background-color: white;
    border-width: 1px;
    border-color: ${({ theme }) => theme.$lightGray};
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    padding-left: 10px;
    color: ${({ theme }) => theme.$textColor};
`;

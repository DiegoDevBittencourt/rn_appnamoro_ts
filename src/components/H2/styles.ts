import styled from 'styled-components/native';

export const Text = styled.Text`
    font-weight: 300;
    font-size: 25px;
    color: ${({ theme }) => theme.$textColor};
`;

import styled from 'styled-components/native';

export const Text = styled.Text`
    font-weight: 100;
    font-size: 21px;
    color: ${({ theme }) => theme.$lightTextColor};
`;

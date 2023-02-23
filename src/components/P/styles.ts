import styled from 'styled-components/native';

export const Text = styled.Text`
    font-weight: 300;
    font-size: 15px;
    color: ${({ theme }) => theme.$lightTextColor};
`;

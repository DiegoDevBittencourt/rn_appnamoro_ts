import styled from 'styled-components/native';

export const ScrollViewCustom = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.$darkerBackgroundColor};
`;

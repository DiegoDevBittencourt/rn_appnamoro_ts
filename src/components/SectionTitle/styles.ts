import styled from 'styled-components/native';

import P from '../P';

export const Container = styled.View`
    height: 50px;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
`;

export const Title = styled(P)`
    margin: 0 0 3px 10px;
    color: ${({ theme }) => theme.$lightTextColor};
`;

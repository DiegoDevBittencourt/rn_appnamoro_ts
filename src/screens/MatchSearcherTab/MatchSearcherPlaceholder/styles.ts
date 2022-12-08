import styled from 'styled-components/native';

import { P, H2 } from '@components/index';

export const MainContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
    width: 100%;
`;

export const PCustom = styled(P)`
    font-size: 16px;
    padding: 0 15px;
    text-align: center;
`;

export const H2Custom = styled(H2)`
    text-align: center;
    margin-bottom: 20px;
`;

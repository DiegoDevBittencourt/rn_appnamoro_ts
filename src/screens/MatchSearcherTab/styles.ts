import styled from 'styled-components';

import { GenericContainer } from '@components/index';

export const MainContainer = styled(GenericContainer)`
    background-color: ${({ theme }) => theme.$darkerBackgroundColor};
`;

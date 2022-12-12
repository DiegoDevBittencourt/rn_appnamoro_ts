import styled from 'styled-components/native';

import { P } from '@components/index';

export const PTitle = styled(P)`
    color: ${({ theme }) => theme.$textColor};
`;

export const PCustom = styled(P)`
    color: ${({ theme }) => theme.$lightTextColor};
`;

export const AddressInfo = styled.View`
    height: ${({ theme }) => theme.$heightOfGenericComponent + 10}px;
    width: 100%;
    align-items: center;
    background-color: white;
    border-width: 1px;
    border-color: ${({ theme }) => theme.$lightGray};
    flex-direction: row;
`;

export const MyLocationContainer = styled.View`
    flex-direction: column;
    width: 100%;
`;

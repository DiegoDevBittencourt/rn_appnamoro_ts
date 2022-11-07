import RNModalSelector from 'react-native-modal-selector'
import styled from 'styled-components/native';

import P from '../P';

export const MainContainer = styled.View`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: 100%;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.$lightGray};
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
    padding: 1px 4px;
    align-items: center;
    justify-content: center;
    text-align: left;
    flex-direction: row;
`;

export const RNModalSelectorCustom = styled(RNModalSelector)`
    height: 100%;
    width: 100%;
    justify-content: center;
    background-color: white;
`;
export const TextContainer = styled.View`
    height: 100%;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

export const PCustom = styled(P)`
    flex: 1;
    align-self: center;
    padding: 10px 0 10px 10px;
`;

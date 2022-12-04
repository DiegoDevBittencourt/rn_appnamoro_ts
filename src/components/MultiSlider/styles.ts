import RNMultiSlider from '@ptomasroos/react-native-multi-slider';
import styled from 'styled-components/native';

import P from '../P';

export const MainContainer = styled.View`
    height: 70px;
    padding: 10px;
    flex-direction: column;
    width: 100%;
`;

export const SubContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;

export const MultiSliderComponentCustom = styled(RNMultiSlider)`
    height: 100%;
    width: 100%;
    position: absolute;
    justify-content: center;
    align-items: center;
`;

export const PCustom = styled(P)`
    flex: 1;
    text-align: right;
`;

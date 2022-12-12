import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import P from '../P';

export const Button = styled.TouchableHighlight`
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
    width: 100%;
    margin-bottom: -1px;
    background-color: white;
    border-width: 1px;
    border-color: ${({ theme }) => theme.$lightGray};
`;

export const ButtonContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const LeftText = styled(P)`
    flex: 1;
    margin-left: 10px;
    color: ${({ theme }) => theme.$lightTextColor};
    font-size: 14px;
    text-align: left;
`;

export const RightText = styled(P)`
    flex: 1;
    margin-right: 10px;
    color: ${({ theme }) => theme.$lightTextColor};
    font-size: 13px;
    text-align: right;
`;

export const Awesome5Icon = styled(FontAwesome)`
    font-size: 14px;
    margin-right: 5px;
    color: ${({ theme }) => theme.$gray};
`;

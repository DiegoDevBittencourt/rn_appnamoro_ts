import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { H2, H3 } from '~/components';

export const ProfileCardInfo = styled.View`
    flex: 1;
    width: ${Dimensions.get('window').width - 20}px;
    justify-content: center;
    align-items: center;
    background-color: white;
    elevation: 5;
    border-radius: ${({ theme }) => theme.$bigBorderRadius}px;
`;

export const NameAge = styled(H2)`
    position: absolute;
    bottom: 30px;
    left: 10px;
    color: white;
`;

export const Distance = styled(H3)`
    position: absolute;
    bottom: 5px;
    left: 10px;
    color: white;
`;

export const UserImage = styled.Image`
    flex: 1;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
    border-radius: ${({ theme }) => theme.$bigBorderRadius}px;
    resize-mode: cover;
`;

export const ControlButtonContainer = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    border-radius: ${({ theme }) => theme?.$bigBorderRadius}px;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme?.$opaqueBlackBackgroundColor};
    flex-direction: row;
`;

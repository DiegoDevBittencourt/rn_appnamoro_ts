import styled from 'styled-components/native';

import { P } from '@components/index';

export const FooterContainer = styled.View`
    height: 50px;
    background-color: white;
    border-top-width: 0.4px;
    border-color: ${({ theme }) => theme.$lightGray};
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const HeaderContainer = styled.View`
    height: 85px;
    border-bottom-width: 0.9px;
    align-items: center;
    border-color: ${({ theme }) => theme.$lightGray};
    flex-direction: row;
    width: 100%;
`;

export const PCustom = styled(P)`
    flex: 1;
    margin-left: 10px;
    font-size: 16px;
`;

export const RightButtonsContainer = styled.View`
    width: ${({ theme }) => theme.$heightOfGenericComponent}px;
    align-items: flex-end;
    flex-direction: column;
`;

export const MessageContainer = styled.View`
    min-height: 50px;
    height: auto;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
`;

export const MessageBaloonContainer = styled.View`
    min-height: 50px;
    height: auto;
    min-width: 60px;
    max-width: 80%;
    justify-content: center;
    border-radius: ${({ theme }) => theme.$bigBorderRadius}px;
    padding: 15px;
`;

export const MessageText = styled.Text`
    font-size: 16px;
    margin-bottom: 6px;
`;

export const TimeText = styled.Text`
    font-size: 11px;
    position: absolute;
    bottom: 3px;
`;

export const TipContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const TipText = styled.Text`
    font-size: 16px;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.$textColor};
    padding: 30px;
    text-align: center;
`;

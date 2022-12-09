import styled from 'styled-components/native';
import { P } from '~/components';

export const YouHaveNoConversationsContainer = styled.View`
    height: 70%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.TouchableHighlight`
    height: 80px;
    width: 100%;
    border-top-width: 0.7px;
    border-top-color: ${({ theme }) => theme.$lightGray};
`;

export const MainContainer = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const TextContainer = styled.View`
    padding-left: 10px;
    flex: 1;
    flex-direction: column;
    width: 100%;
`;

export const PTitle = styled(P)`
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 5px;
`;

export const PMessage = styled(P)`
    font-size: 15px;
`;

export const PTime = styled(P)`
    font-size: 12px;
`;

export const TimeContainer = styled.View`
    width: 35px;
    height: 100%;
    padding-bottom: 5px;
    justify-content: flex-end;
`;

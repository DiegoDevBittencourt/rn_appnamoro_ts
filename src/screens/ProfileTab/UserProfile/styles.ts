import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { GenericContainer, P } from '~/components';

export const ProfileScreenContainer = styled.View`
    height: 100%;
    background-color: ${({ theme }) => theme.$darkerBackgroundColor};
    justify-content: flex-end;
`;

export const TheCircle = styled.View`
    align-self: center;
    height: 1500px;
    width: 1500px;
    margin-bottom: 50px;
    background-color: white;
    border-radius: 3000px;
    elevation: 2;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
`;

export const UserPersonalInfoContainer = styled(GenericContainer)`
    height: auto;
    align-items: center;
    margin-bottom: -10px;
`;

export const UserImage = styled.Image`
    width: 150px;
    height: 150px;
    resize-mode: cover;
    border-radius: 300px;
    border-width: 3px;
    border-color: ${({ theme }) => theme.$lightGray};
`;

export const P1 = styled(P)`
    margin-top: 10px;
    font-size: 20px;
    width: 100%;
    text-align: center;
    color: black;
`;

export const P2 = styled(P)`
    margin-top: 2px;
    font-size: 13px;
    color: ${({ theme }) => theme.$gray};
    text-align: center;
`;

export const ControlButtonsContainer = styled.View`
    height: auto;
    width: ${Dimensions.get('window').width}px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-bottom: 15px;
`;

export const ButtonContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const PCustom = styled(P)`
    margin-top: 10px;
    font-size: 13px;
    color: black;
`;

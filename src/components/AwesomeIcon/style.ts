import styled from 'styled-components/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export const Awesome5Icon = styled(FontAwesome)`
    font-size: 18px;
`;

export const EvilIcon = styled(EvilIcons)`
    font-size: 18px;
`;

export const IconContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: ${({ theme }) => theme.$heightOfGenericComponent}px;
    height: ${({ theme }) => theme.$heightOfGenericComponent}px;
`;

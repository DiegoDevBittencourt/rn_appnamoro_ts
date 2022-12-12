import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import { GenericContainer } from '@components/index';

export const PicturesEditorContainer = styled(GenericContainer)`
    height: auto;
    align-items: center;
`;

export const PicturesContainer = styled.View`
    height: ${(Dimensions.get('window').height / 100) * 65}px;
    margin-top: 10px;
    flex-direction: column;
    width: 100%;
`;

export const LineImagesContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;

export const UserImageContainer = styled.View`
    flex: 1;
    padding: 15px;
    background-color: white;
    border-width: 0.5px;
    border-style: dotted;
    border-color: ${({ theme }) => theme.$lightGray};
`;

export const Button = styled.TouchableHighlight`
    flex: 1;
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
`;

export const ButtonContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const UserImage = styled.Image`
    height: 100%;
    width: 100%;
    border-radius: ${({ theme }) => theme.$smallBorderRadius}px;
`;

export const ProgressBarContainer = styled.View`
    position: absolute;
    height: auto;
    width: auto;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 50px;
`;

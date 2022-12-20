import styled from 'styled-components/native';

export const MainContainer = styled.View`
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 10px;
    flex-direction: column;
`;

export const ContentContainer = styled.View`
    height: auto;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
`;

export const UsersImagesContainer = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin-top: 20px;
    justify-content: space-evenly;
`;

export const UserImage = styled.Image`
    width: 150px;
    height: 150px;
    resize-mode: cover;
    border-radius: 300px;
    border-width: 3px;
    border-color: ${({ theme }) => theme.$lightGray};
`;

export const DescriptionText = styled.Text`
    color: white;
    font-size: 18;
    text-align: center;
`;

export const ControlButtonsContainer = styled.View`
    flex-direction: column;
    min-width: 300px;
    min-height: 130px;
    justify-content: center;
    align-items: center;
    margin-top: 30;
`;

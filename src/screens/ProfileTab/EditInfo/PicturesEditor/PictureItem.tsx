import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';

import noProfile from '@assets/noProfile.png';
import { pickFile } from './uploadMedia';
import { theme } from '@constants/styledComponentsTheme';
import { RoundCloseButton } from '@components/index';
import { Button, ButtonContainer, ProgressBarContainer, UserImage, UserImageContainer } from './styles';
import { useUsers } from '~/store/users/reducer';
import { GENERIC_YES_NO_MODAL } from '~/constants/screenNames';
import { dangerNotification } from '~/utils/notifications';

export default function PictureItem({ PictureItem }: any) {

    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const { userData } = useSelector(useUsers);
    const { userImages } = userData;

    const imageSource = PictureItem.imageUrl ? { uri: PictureItem.imageUrl } : noProfile;

    const customButtonStyle = {
        position: 'absolute',
        height: 40,
        width: 40,
        right: 0,
        top: 0,
        backgroundColor: 'white'
    };

    const handleDeletePicture = () => {
        navigation.push(GENERIC_YES_NO_MODAL, {
            title: 'Excluir imagem?',
            subtitle: 'Esta ação não pode ser desfeita!',
            acceptText: 'Excluir',
            denyText: 'Cancelar',
            selectedMethod: 'genericYesNoModalDeleteUserImage',
            selectedUserImageId: PictureItem.id
        });
    }

    const DeleteImageButton = () => {
        return PictureItem.imageUrl ? PictureItem.uploaded &&
            <RoundCloseButton
                customIconStyle={{ fontSize: 23, color: theme.$red }}
                customButtonStyle={customButtonStyle}
                onPress={handleDeletePicture}
            /> : null
    }

    const UploadProgressBar = () => {
        return PictureItem.progress > 0 ?
            <ProgressBarContainer>

                <Progress.Circle
                    progress={PictureItem.progress / 100}
                    color={theme.$primaryColor}
                    textStyle={{ fontSize: 12 }}
                    showsText
                />

            </ProgressBarContainer> : null
    }

    const pickImages = () => {
        console.log('userImages', userImages);
        if (userImages && userImages?.length <= 8)
            pickFile(userImages?.length || 0, dispatch);
        else
            dangerNotification('Impossível adicionar mais que nove imagens!');
    }

    return <UserImageContainer>

        <Button underlayColor={theme.$gray} onPress={pickImages}>
            <ButtonContainer>
                <UserImage source={imageSource} />
                <UploadProgressBar />
            </ButtonContainer>
        </Button>

        <DeleteImageButton />

    </UserImageContainer>
}

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';

import { pickFile } from './uploadMedia';
import { theme } from '@constants/styledComponentsTheme';
import { RoundCloseButton } from '@components/index';
import noProfile from '@assets/noProfile.png';
import { Button, ButtonContainer, ProgressBarContainer, UserImage, UserImageContainer } from './styles';
import { useUsers } from '~/store/users/reducer';

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
        navigation.push('GenericYesNoModal', {
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

    const pickImages = () => pickFile(userImages?.length || 0, dispatch);

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

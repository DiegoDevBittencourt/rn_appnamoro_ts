import React from 'react';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ImageSlider } from "react-native-image-slider-banner";

import noProfile from '@assets/noProfile.png';
import useUploadMedia from '~/hooks/useUploadMedia';
import { theme } from '@constants/styledComponentsTheme';
import { RoundCloseButton } from '@components/index';
import { Button, ButtonContainer, ProgressBarContainer, UserImage, UserImageContainer } from './styles';
import { useUsers } from '~/store/users/reducer';
import { GENERIC_YES_NO_MODAL } from '~/constants/screenNames';
import { dangerNotification } from '~/utils/notifications';
import { IMPOSSIBLE_ADD_MORE_THAN_NINE_IMAGES } from '~/constants/messages';
import { useDashboard } from '~/store/dashboard/reducer';

export default function PictureItem({ PictureItem }: any) {

    const navigation = useNavigation<any>();
    const { pickFile } = useUploadMedia();

    const { userData } = useSelector(useUsers);
    const { uploadingImagesPreview } = useSelector(useDashboard);
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
        const imagesQuantity = (userImages?.length || 0) + (uploadingImagesPreview?.length || 0);

        if (imagesQuantity <= 8)
            pickFile();
        else
            dangerNotification(IMPOSSIBLE_ADD_MORE_THAN_NINE_IMAGES);
    }

    return <UserImageContainer>
        <Button underlayColor={theme.$gray} onPress={pickImages}>
            <ButtonContainer>
                {PictureItem.imageUrl ? <ImageSlider
                    data={[{ img: PictureItem.imageUrl }]}
                    autoPlay={false}
                    activeIndicatorStyle={{ display: 'none' }}
                    indicatorContainerStyle={{ display: 'none' }}
                    caroselImageStyle={{ resizeMode: "cover", height: '100%' }}
                    closeIconColor="#fff"
                /> : <UserImage source={imageSource} />}
                <UploadProgressBar />
            </ButtonContainer>
        </Button>

        <DeleteImageButton />
    </UserImageContainer>
}

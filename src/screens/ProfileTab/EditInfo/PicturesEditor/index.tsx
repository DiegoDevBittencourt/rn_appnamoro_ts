import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pictures from './Pictures';
import { SectionTitle, GenericAppButton } from '@components/index';
import { pickFile } from './uploadMedia';
import { useUsers } from '~/store/users/reducer';
import { dangerNotification } from '~/utils/notifications';
import { IMPOSSIBLE_ADD_MORE_THAN_NINE_IMAGES } from '~/constants/messages';
import { useDashboard } from '~/store/dashboard/reducer';
import { PicturesContainer, PicturesEditorContainer } from './styles';

const PicturesEditor = () => {

    const dispatch = useDispatch();

    const { uploadingImagesPreview } = useSelector(useDashboard);
    const { userData } = useSelector(useUsers);
    const { userImages } = userData;

    const pickImages = () => {
        const imagesQuantity = (userImages?.length || 0) + (uploadingImagesPreview?.length || 0);

        if (imagesQuantity <= 8)
            pickFile(userImages?.length || 0, dispatch);
        else
            dangerNotification(IMPOSSIBLE_ADD_MORE_THAN_NINE_IMAGES);
    }

    return <PicturesEditorContainer>

        <SectionTitle titleText='ADICIONE FOTOS SUAS' />

        <PicturesContainer>
            <Pictures />
        </PicturesContainer>

        <GenericAppButton
            customButtonStyle={{ margin: 20 }}
            textButton='ADICIONAR MÍDIA'
            onPress={pickImages}
        />

    </PicturesEditorContainer>
}

export default PicturesEditor;

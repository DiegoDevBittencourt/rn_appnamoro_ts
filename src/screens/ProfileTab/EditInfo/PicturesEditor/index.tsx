import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pictures from './Pictures';
import { SectionTitle, GenericAppButton } from '@components/index';
import { pickFile } from './uploadMedia';
import { PicturesContainer, PicturesEditorContainer } from './styles';
import { useUsers } from '~/store/users/reducer';
import { dangerNotification } from '~/utils/notifications';

const PicturesEditor = () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(useUsers);
    const { userImages } = userData;

    const pickImages = () => {
        if (userImages && userImages?.length <= 8)
            pickFile(userImages?.length || 0, dispatch);
        else
            dangerNotification('Impossível adicionar mais que nove imagens!');
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

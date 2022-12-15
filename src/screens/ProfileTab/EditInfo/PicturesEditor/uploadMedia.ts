import ImagePicker from 'react-native-image-crop-picker';

import { dangerNotification } from '~/utils/notifications';
import { handleError, generateRandomKey } from '~/utils/functions';
import { uploadImageToServer } from '~/store/dashboard/thunk';

export function pickFile(userImagesLength: number, dispatch: any) {
    try {
        ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            mediaType: 'photo'
        }).then(images => {

            const pickedImages = images.map(image => ({
                ...image,
                uri: image.path,
                type: image.mime,
                name: 'userImage'
            }))

            uploadMedia(pickedImages, userImagesLength, dispatch);
        });
    } catch (err) {
        handleError(err);
    }
}

export const uploadMedia = (files: any[], userImagesLength: number, dispatch: any) => {
    if (!files.some(item => item.size > 5 * 1024 * 1024)) {
        const selectedFiles = files.map((file) => ({
            file,
            id: generateRandomKey(1, 999999),//(used to when finished upload the image, removes the preview from uploadingImagesPreview array)
            progress: 0,
            uploaded: false,
            error: false,
        }));

        uploadImages(selectedFiles, dispatch);
    }
    else
        dangerNotification('As imagens devem ser menores que 5MB!');
}

const uploadImages = (selectedFiles: any[], dispatch: any) => {

    selectedFiles.map(selectedFile => {

        const imageFormData = new FormData();

        imageFormData.append('file', selectedFile.file);

        dispatch(uploadImageToServer(imageFormData, selectedFile));
    });
}

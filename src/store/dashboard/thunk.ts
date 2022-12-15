import api from '@utils/api';
import { decodeJwtToken } from '~/utils/functions';
import { successNotification } from '~/utils/notifications';
import { signOut } from '../auth/thunk';
import { handleThunkError } from '../error/thunk';
import { getUserData } from '../users/thunk';
import { showLoader } from '../utils/reducer';
import { updateUploadingImagesPreview } from './reducer';

export function uploadImageToServer(imageData: any, selectedFile: any) {
    return async (dispatch: any, getState: any) => {

        const { id: userId } = getState().users.userData;

        try {
            await api.post(`users/user_images/${userId}`, imageData, {
                onUploadProgress: e => {

                    const progress = parseInt(String(Math.round((e.loaded * 100) / e.total)));
                    dispatch(updateImagesPreview({ ...selectedFile, progress }));
                }
            });

            dispatch(removeFromImagesPreviewById(selectedFile.id));
            dispatch(getUserData({ shouldGetAddress: true }));

        } catch (err) {
            dispatch(removeFromImagesPreviewById(selectedFile.id));
            dispatch(handleThunkError(err));
        }
    }
}

export function removeFromImagesPreviewById(id: string) {
    return async (dispatch: any, getState: any) => {

        const { uploadingImagesPreview } = getState().dashboard;

        const newArr = uploadingImagesPreview.filter((item: any) => item.id !== id);
        dispatch(updateUploadingImagesPreview(newArr));
    }
}

export function updateImagesPreview(payload: any) {
    return async (dispatch: any, getState: any) => {

        const { uploadingImagesPreview } = getState().dashboard;

        if (uploadingImagesPreview.some((item: any) => item.id === payload.id)) {
            const newArr = uploadingImagesPreview?.map((item: any) => {
                if (item?.id === payload?.id)
                    return { ...item, progress: payload?.progress };

                return item;
            });

            dispatch(updateUploadingImagesPreview(newArr));
        }
        else {
            const newArr = [...uploadingImagesPreview, payload];
            dispatch(updateUploadingImagesPreview(newArr));
        }
    }
}

export function deleteAccount() {
    return async (dispatch: any, getState: any) => {

        dispatch(showLoader(true));

        const userState = getState().users;

        try {
            await api.delete(`account/delete-account/${userState.userData.id}`)
                .then(() => dispatch(signOut()));

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function sendEmailVerification(email: string) {
    return async (dispatch: any, getState: any) => {

        const { accessToken } = getState().auth;

        try {
            dispatch(showLoader(true));

            const userId = decodeJwtToken(accessToken).id;

            await api.post('account/send_email_verification', { email, id: userId });

            dispatch(showLoader(false));

            successNotification('E-mail enviado, verifique sua caixa de entrada.');

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function sendNewUserContact({ name, email, subject, message }: { name?: string, email?: string, subject?: string, message?: string }) {
    return async (dispatch: any) => {

        try {
            dispatch(showLoader(true));

            await api.post('users/contact', { name, email, subject, message });

            dispatch(showLoader(false));

            successNotification('Contato enviado com sucesso! Obrigado por nos contactar.');

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function sendRecoverPasswordEmail(email: string) {
    return async (dispatch: any) => {

        try {
            dispatch(showLoader(true));

            await api.post('account/send_recovery_password_email', { email });

            dispatch(showLoader(false));

            successNotification('E-mail enviado, verifique sua caixa de entrada.');

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

export function resetPassword(
    { email, token, password, passwordConfirmation }: { email?: string, token?: string, password?: string, passwordConfirmation?: string }
) {
    return async (dispatch: any) => {

        try {
            dispatch(showLoader(true));

            const res = await api.post('account/passwordreset', { email, token, password, passwordConfirmation });

            dispatch(showLoader(false));

            return res;

        } catch (err) {
            dispatch(handleThunkError(err));
        }
    }
}

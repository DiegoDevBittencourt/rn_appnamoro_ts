import { handleError } from '~/utils/functions';
import { signOut } from '../auth/thunk';
import { showLoader } from '../utils/reducer';

export function handleThunkError(err: any) {
    return (dispatch: any) => {
        dispatch(showLoader(false));

        //status 401 is Unauthorized, which means that user loses the access to the API
        if (err?.response?.status == 401 && err?.response?.data == 'Unauthorized')
            dispatch(signOut());
        else if (err?.message != 'Location permission not granted.')
            handleError(err);
    }
}

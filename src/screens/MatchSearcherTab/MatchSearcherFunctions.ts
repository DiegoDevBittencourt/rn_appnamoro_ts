import * as matchThunk from '@store/match/thunk';
import { updateIsSuperLikeAvailable } from '~/store/match/reducer';

export function ignoreCurrentProfile(dispatch: any, profileId: string) {
    dispatch(matchThunk.ignoreCurrentProfile(profileId));
}

export function likeCurrentProfile(dispatch: any, superLike: boolean, currentProfile: any) {
    superLike && dispatch(updateIsSuperLikeAvailable(false));
    dispatch(matchThunk.likeCurrentProfile(currentProfile, superLike));
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { theme } from '@constants/styledComponentsTheme';
import { RoundIconButton } from '@components/index';
import { checkIfSuperLikeIsAvailable } from '~/utils/functions';
import { updateIsSuperLikeAvailable, useMatch } from '~/store/match/reducer';
import { useUsers } from '~/store/users/reducer';
import { ignoreCurrentProfile, likeCurrentProfile } from '~/store/match/thunk';
import { MainContainer } from './styles';

export default function ControlButtons() {

    const dispatch = useDispatch<any>();

    const { userData } = useSelector(useUsers);
    const { availableProfilesToMatch, isSuperLikeAvailable } = useSelector(useMatch);
    const { lastTimeSuperLikeWasUsed } = userData;

    const { $lightGray, $gray, $red, $lightGreen, $lightBlue } = theme;

    useEffect(() => {
        dispatch(updateIsSuperLikeAvailable(checkIfSuperLikeIsAvailable(lastTimeSuperLikeWasUsed)));
    }, [lastTimeSuperLikeWasUsed]);

    const handleLikeCurrentProfile = (wasSuperLikeUsed: boolean) => {
        dispatch(likeCurrentProfile(availableProfilesToMatch[0], wasSuperLikeUsed));
    };

    const handleIgnoreCurrentProfile = async () => {
        dispatch(ignoreCurrentProfile(availableProfilesToMatch[0]?.id));
    };

    const customButtonStyle = {
        height: 70,
        width: 70
    };

    const customIconStyle = {
        fontSize: 25
    };

    return <MainContainer>
        <RoundIconButton
            customButtonStyle={customButtonStyle}
            iconName={'times'}
            customIconStyle={{ ...customIconStyle, color: $red }}
            underlayColor={$lightGray}
            onPress={handleIgnoreCurrentProfile}
        />

        <RoundIconButton
            iconName={'star'}
            solidIcon
            customIconStyle={{ ...customIconStyle, color: isSuperLikeAvailable ? $lightBlue : $gray }}
            underlayColor={$lightGray}
            onPress={() => isSuperLikeAvailable && handleLikeCurrentProfile(true)}
        />

        <RoundIconButton
            customButtonStyle={customButtonStyle}
            iconName={'heart'}
            solidIcon
            customIconStyle={{ ...customIconStyle, color: $lightGreen }}
            underlayColor={$lightGray}
            onPress={() => handleLikeCurrentProfile(false)}
        />
    </MainContainer>
}

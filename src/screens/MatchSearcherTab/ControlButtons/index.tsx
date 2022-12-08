import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { theme } from '@constants/StyledComponentsTheme';
import { RoundIconButton } from '@components/index';
import { checkIfSuperLikeIsAvailable } from '~/utils/functions';
import { ignoreCurrentProfile, likeCurrentProfile } from '../MatchSearcherFunctions';
import { updateIsSuperLikeAvailable, useMatch } from '~/store/match/reducer';
import { MainContainer } from './styles';
import { useUsers } from '~/store/user/reducer';

export default function ControlButtons({ currentProfile }: any) {

    const dispatch = useDispatch();

    const { userData } = useSelector(useUsers);
    const { isSuperLikeAvailable, swipeCardRef } = useSelector(useMatch);
    const { lastTimeSuperLikeWasUsed } = userData;

    const { $lightGray, $gray, $red, $lightGreen, $lightBlue } = theme;

    useEffect(() => {
        dispatch(updateIsSuperLikeAvailable(checkIfSuperLikeIsAvailable(lastTimeSuperLikeWasUsed)));
    }, [lastTimeSuperLikeWasUsed]);

    const handleLikeCurrentProfile = (superLike: boolean) => {
        superLike ? swipeCardRef._forceUpSwipe() : swipeCardRef._forceRightSwipe();

        setTimeout(() => {
            likeCurrentProfile(dispatch, superLike, currentProfile);
        }, 1000);
    };

    const handleIgnoreCurrentProfile = async () => {
        swipeCardRef._forceLeftSwipe();

        setTimeout(() => {
            ignoreCurrentProfile(dispatch, currentProfile?.id);
        }, 1000);
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
            onPress={() => handleIgnoreCurrentProfile()}
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

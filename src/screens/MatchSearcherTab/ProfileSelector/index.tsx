import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileCard from '../ProfileCard';
import SwipeCards from 'react-native-deck-swiper'
import { MainContainer } from './styles';
import { useMatch } from '~/store/match/reducer';
import {
    ignoreCurrentProfile,
    likeCurrentProfile
} from '~/store/match/thunk';

export default function ProfileSelector() {

    const dispatch = useDispatch<any>();

    const { matchSearcherProfiles, isSuperLikeAvailable } = useSelector(useMatch);

    const handleLikeCurrentProfile = (wasSuperLikeUsed: boolean) => {
        dispatch(likeCurrentProfile(matchSearcherProfiles[0], wasSuperLikeUsed));
    };

    const handleIgnoreCurrentProfile = async () => {
        dispatch(ignoreCurrentProfile(matchSearcherProfiles[0]?.id));
    };

    return <MainContainer>
        <SwipeCards
            backgroundColor={'transparent'}
            keyExtractor={(item: any) => item?.id?.toString()}
            cards={matchSearcherProfiles}
            onSwipedLeft={handleIgnoreCurrentProfile}
            onSwipedRight={() => handleLikeCurrentProfile(false)}
            onSwipedTop={() => handleLikeCurrentProfile(true)}
            cardStyle={{ flex: 1, marginTop: -50 }}
            renderCard={(cardData: any) => <ProfileCard {...cardData} />}
            disableBottomSwipe
            disableTopSwipe={!isSuperLikeAvailable}
        />
    </MainContainer>
}

import React, { useEffect, useRef } from 'react';
// import SwipeCards from 'react-native-swipe-cards';
import { useDispatch, useSelector } from 'react-redux';

import ProfileCard from '../ProfileCard';
import MatchSearcherPlaceholder from '../MatchSearcherPlaceholder';
import { theme } from '@constants/StyledComponentsTheme';
import { ignoreCurrentProfile, likeCurrentProfile } from '../MatchSearcherFunctions';
import { MainContainer } from './styles';
import { updateSwipeCardRef, useMatch } from '~/store/match/reducer';

export default function ProfileSelector() {

    const dispatch = useDispatch();
    const swipeCardRef = useRef<any>();

    const { matchSearcherProfiles, isSuperLikeAvailable } = useSelector(useMatch);
    const { $lightBlue, $green, $red } = theme;

    const handleLikeCurrentProfile = (superLike: boolean, currentProfile: any) => likeCurrentProfile(dispatch, superLike, currentProfile);

    useEffect(() => {
        dispatch(updateSwipeCardRef(swipeCardRef));
    }, []);

    return <MainContainer>
        {/* <SwipeCards
            ref={swipeCardRef}
            keyExtractor={(item: any) => item.id.toString()}
            cards={matchSearcherProfiles}
            renderNoMoreCards={() => <MatchSearcherPlaceholder bodyText={'Buscando perfis...'} />}
            renderCard={(cardData: any) => <ProfileCard {...cardData} />}
            smoothTransition={false}
            yupText={'Gostei'}
            yupStyle={{ borderColor: $green }}
            yupTextStyle={{ color: $green }}
            handleYup={(cardData: any) => handleLikeCurrentProfile(false, cardData)}

            nopeText={'Não gostei'}
            nopeStyle={{ borderColor: $red }}
            nopeTextStyle={{ color: $red }}
            handleNope={(cardData: any) => ignoreCurrentProfile(dispatch, cardData?.id)}

            showMaybe={isSuperLikeAvailable}
            hasMaybeAction={isSuperLikeAvailable}
            maybeText={'Super Like'}
            maybeStyle={{ borderColor: $lightBlue }}
            maybeTextStyle={{ color: $lightBlue }}
            handleMaybe={(cardData: any) => isSuperLikeAvailable && handleLikeCurrentProfile(true, cardData)}
        /> */}
    </MainContainer>
}

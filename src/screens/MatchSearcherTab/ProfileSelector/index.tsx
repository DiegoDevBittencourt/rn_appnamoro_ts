import React, { useEffect, useRef } from 'react';
// import SwipeCards from 'react-native-swipe-cards';
import { useDispatch, useSelector } from 'react-redux';
// import CardStack, { Card } from 'react-native-card-stack-swiper';
// import Swiper from 'react-native-deck-swiper';
import TinderCard from 'react-tinder-card'

import ProfileCard from '../ProfileCard';
import MatchSearcherPlaceholder from '../MatchSearcherPlaceholder';
import { theme } from '@constants/styledComponentsTheme';
import { ignoreCurrentProfile, likeCurrentProfile } from '../MatchSearcherFunctions';
import { MainContainer } from './styles';
import { updateSwipeCardRef, useMatch } from '~/store/match/reducer';
import { P } from '~/components';
import { Text } from 'react-native-paper';

export default function ProfileSelector() {

    const dispatch = useDispatch();
    const swipeCardRef = useRef<any>();

    const { matchSearcherProfiles, isSuperLikeAvailable } = useSelector(useMatch);
    const { $lightBlue, $green, $red } = theme;

    const handleLikeCurrentProfile = (superLike: boolean, currentProfile: any) => likeCurrentProfile(dispatch, superLike, currentProfile);

    useEffect(() => {
        dispatch(updateSwipeCardRef(swipeCardRef));
    }, []);

    const onSwipe = (direction: any) => {
        console.log('You swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier: any) => {
        console.log(myIdentifier + ' left the screen')
    }

    return <MainContainer>
        <TinderCard
            onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} >
            <ProfileCard /*{...cardData}*/ />
        </TinderCard>
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

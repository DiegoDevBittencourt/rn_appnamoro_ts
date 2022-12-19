import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileCard from '../ProfileCard';
import { MainContainer } from './styles';
import { updateSwipeCardRef, useMatch } from '~/store/match/reducer';
import SwipeCards from 'react-native-deck-swiper'

export default function ProfileSelector() {
    const dispatch = useDispatch<any>();
    const swipeCardRef = useRef<any>();

    const { matchSearcherProfiles } = useSelector(useMatch);

    useEffect(() => {
        dispatch(updateSwipeCardRef(swipeCardRef));
    }, []);

    return <MainContainer>
        {/* <ProfileCard {...matchSearcherProfiles[0]} /> */}
        <SwipeCards

            ref={swipeCardRef}
            backgroundColor={'orange'}
            cardStyle={{ backgoundColor: 'green' }}
            containerStyle={{ backgoundColor: 'green' }}
            keyExtractor={(item: any) => item.id.toString()}
            cards={matchSearcherProfiles}
            onSwipedLeft={() => console.log('no like')}
            onSwipedRight={() => console.log('like')}
            onSwipedTop={() => console.log('super like')}
            disableBottomSwipe
            // renderNoMoreCards={() => <MatchSearcherPlaceholder bodyText={'Buscando perfis...'} />}
            renderCard={(cardData: any) => <ProfileCard {...cardData} />}
        // smoothTransition={false}
        // yupText={'Gostei'}
        // yupStyle={{ borderColor: $green }}
        // yupTextStyle={{ color: $green }}
        // handleYup={(cardData: any) => handleLikeCurrentProfile(false, cardData)}

        // nopeText={'Não gostei'}
        // nopeStyle={{ borderColor: $red }}
        // nopeTextStyle={{ color: $red }}
        // handleNope={(cardData: any) => ignoreCurrentProfile(dispatch, cardData?.id)}

        // showMaybe={isSuperLikeAvailable}
        // hasMaybeAction={isSuperLikeAvailable}
        // maybeText={'Super Like'}
        // maybeStyle={{ borderColor: $lightBlue }}
        // maybeTextStyle={{ color: $lightBlue }}
        // handleMaybe={(cardData: any) => isSuperLikeAvailable && handleLikeCurrentProfile(true, cardData)}
        />
    </MainContainer>
}

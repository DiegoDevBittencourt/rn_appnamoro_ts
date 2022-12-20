import React from 'react';
import { useSelector } from 'react-redux';
import { MainContainer } from './styles';

import MatchSearcherPlaceholder from './MatchSearcherPlaceholder';
import ProfileSelector from './ProfileSelector';
import ControlButtons from './ControlButtons';
import { useMatch } from '~/store/match/reducer';
import { useUtils } from '~/store/utils/reducer';
import { useUsers } from '~/store/users/reducer';
import { weFoundAProblem, turnOnShowMeOnApp, turnOnLocation } from '@constants/InfoText';

export default function MatchSearcherTab() {

    const { availableProfilesToMatch, isGettingProfileForTheMatchSearcher } = useSelector(useMatch);
    const { isGeolocationEnabled, isGettingLocation } = useSelector(useUtils);
    const { userData } = useSelector(useUsers);
    const { showMeOnApp } = userData;

    return <MainContainer>
        {(isGettingLocation || isGettingProfileForTheMatchSearcher && availableProfilesToMatch.length <= 0) && <MatchSearcherPlaceholder
            bodyText={'Buscando perfis...'}
        />}

        {(!isGettingLocation && !isGettingProfileForTheMatchSearcher && !showMeOnApp) && <MatchSearcherPlaceholder
            title={weFoundAProblem}
            bodyText={turnOnShowMeOnApp}
        />}

        {(!isGettingLocation && !isGettingProfileForTheMatchSearcher && !isGeolocationEnabled) && <MatchSearcherPlaceholder
            title={weFoundAProblem}
            bodyText={turnOnLocation}
        />}

        {(!isGettingLocation && !isGettingProfileForTheMatchSearcher && availableProfilesToMatch.length == 0) && <MatchSearcherPlaceholder
            bodyText={'Oops, não encontramos ninguém próximo a você. Tente aumentar sua "Distância máxima" ou a\n"Faixa etária" no menu "Configurações".\nBoa sorte!'}
        />}

        {availableProfilesToMatch?.length > 0 && <>
            <ProfileSelector />
            <ControlButtons />
        </>}
    </MainContainer>
}

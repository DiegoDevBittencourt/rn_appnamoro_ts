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

    const { matchSearcherProfiles, isGettingProfileForTheMatchSearcher } = useSelector(useMatch);
    const { isGeolocationEnabled, isGettingLocation } = useSelector(useUtils);
    const { userData } = useSelector(useUsers);
    const { showMeOnApp } = userData;

    const shouldRenderLoadingScreen = (isGettingProfileForTheMatchSearcher || isGettingProfileForTheMatchSearcher == null || isGettingLocation);

    const MatchSeacherBody = shouldRenderLoadingScreen ? <MatchSearcherPlaceholder bodyText={'Buscando perfis...'} />
        :
        !showMeOnApp ? <MatchSearcherPlaceholder title={weFoundAProblem} bodyText={turnOnShowMeOnApp} />
            :
            !isGeolocationEnabled ? <MatchSearcherPlaceholder title={weFoundAProblem} bodyText={turnOnLocation} />
                :
                matchSearcherProfiles.length > 0 ? <ProfileSelector />
                    :
                    !isGettingProfileForTheMatchSearcher && <MatchSearcherPlaceholder bodyText={'Oops, não encontramos ninguém próximo a você. Tente aumentar sua "Distância máxima" ou a\n"Faixa etária" no menu "Configurações".\nBoa sorte!'} />

    const ControlButtonSection = matchSearcherProfiles.length > 0 && <ControlButtons currentProfile={matchSearcherProfiles[0]} />

    return <MainContainer>

        {MatchSeacherBody}

        {ControlButtonSection}

    </MainContainer>
}

import React from 'react';
import { useSelector } from 'react-redux';

import MatchesContent from './MatchesContent';
import { P } from '@components/index';
import { YouHaveNoMatchesContainer } from './styles';
import { useMatch } from '~/store/match/reducer';

export default function Matches() {

    const { matchedProfiles } = useSelector(useMatch);

    const YouHaveNoMatches = () => <YouHaveNoMatchesContainer>
        <P>{'Você ainda não tem nenhuma match!'}</P>
    </YouHaveNoMatchesContainer>

    return matchedProfiles?.length > 0 ? <MatchesContent /> : <YouHaveNoMatches />
}

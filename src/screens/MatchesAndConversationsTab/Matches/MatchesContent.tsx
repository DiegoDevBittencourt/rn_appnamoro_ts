import React from 'react';
import { useSelector } from 'react-redux';

import MatchItem from './MatchItem';
import { GenericDataList } from '@components/index';
import { useMatch } from '~/store/match/reducer';

const MatchesContent = () => {

    const { matchedProfiles } = useSelector(useMatch);

    const MatchItemFL = ({ item }: any) => <MatchItem matchedProfile={item} />

    return <GenericDataList
        horizontal
        data={matchedProfiles}
        renderItem={MatchItemFL}
    />
}

export default MatchesContent;

import React from 'react';
import { useSelector } from 'react-redux';

import ConversationsContent from './ConversationsContent';
import { P } from '@components/index';
import { YouHaveNoConversationsContainer } from './styles';
import { useMatch } from '~/store/match/reducer';
import { useMongodb } from '~/store/mongodb/reducer';

export default function Conversations() {

    const { matchedProfiles } = useSelector(useMatch);
    const { realTimeMongodbChat } = useSelector(useMongodb);

    const YouHaveNoConversations = () => <YouHaveNoConversationsContainer>
        <P>{'Você ainda não iniciou nenhuma conversa.'}</P>
    </YouHaveNoConversationsContainer>

    return (matchedProfiles?.length > 0 && realTimeMongodbChat?.length > 0) ? <ConversationsContent /> : <YouHaveNoConversations />
}

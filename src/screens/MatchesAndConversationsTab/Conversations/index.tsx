import React from 'react';
import { useSelector } from 'react-redux';

import ConversationsContent from './ConversationsContent';
import { P } from '@components/index';
import { YouHaveNoConversationsContainer } from './styles';
import { useMatch } from '~/store/match/reducer';
import { useFirebase } from '~/store/firebase/reducer';

export default function Conversations() {

    const { matchedProfiles } = useSelector(useMatch);
    const { realTimeFirebaseChat } = useSelector(useFirebase);

    const YouHaveNoConversations = () => <YouHaveNoConversationsContainer>
        <P>{'Você ainda não iniciou nenhuma conversa.'}</P>
    </YouHaveNoConversationsContainer>

    return (matchedProfiles?.length > 0 && realTimeFirebaseChat?.length > 0) ? <ConversationsContent /> : <YouHaveNoConversations />
}

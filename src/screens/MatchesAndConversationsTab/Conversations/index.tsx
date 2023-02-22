import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ConversationsContent from './ConversationsContent';
import { P } from '@components/index';
import { YouHaveNoConversationsContainer } from './styles';
import { useMatch } from '~/store/match/reducer';
import { useMongodb } from '~/store/mongodb/reducer';
import { useUsers } from '~/store/users/reducer';

export default function Conversations() {

    const { matchedProfiles } = useSelector(useMatch);
    const { realTimeMongodbChat } = useSelector(useMongodb);
    const { userData } = useSelector(useUsers);

    const [conversations, setConversations] = useState<any>([]);

    useEffect(() => {
        const conversations = realTimeMongodbChat?.filter(item => userData?.id == item?.userId_sender || userData?.id == item?.userId_receiver).reverse();
        setConversations(conversations);
    }, []);

    const YouHaveNoConversations = () => <YouHaveNoConversationsContainer>
        <P>{'Você ainda não iniciou nenhuma conversa.'}</P>
    </YouHaveNoConversationsContainer>

    return (matchedProfiles?.length > 0 && conversations?.length > 0) ? <ConversationsContent /> : <YouHaveNoConversations />
}

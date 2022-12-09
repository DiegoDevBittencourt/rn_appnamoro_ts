import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ConversationItem from './ConversationItem';
import { GenericDataList } from '@components/index';
import { useFirebase } from '~/store/firebase/reducer';
import { useMatch } from '~/store/match/reducer';
import { useUsers } from '~/store/users/reducer';

export default function ConversationsContent() {

    const { realTimeFirebaseChat } = useSelector(useFirebase);
    const { matchedProfiles } = useSelector(useMatch);
    const { userData } = useSelector(useUsers);
    const { id } = userData;

    const [conversations, setConversations] = useState<any>([]);

    useEffect(() => {
        updateConversationsArray();
    }, [realTimeFirebaseChat]);

    const updateConversationsArray = () => {
        //filter realTimeFirebaseChat to create one item of each conversation that the user had with other users
        //containing matchedProfile info and the last message info of their conversation
        const matchedProfileIdsAlreadyOnConversationsHelper: any[] = [];

        const conversationsHelper = realTimeFirebaseChat.filter(messageItem => {
            const matchedProfileId = messageItem.userId_1 == id ? messageItem.userId_2 : messageItem.userId_1;

            if (!matchedProfileIdsAlreadyOnConversationsHelper.includes(matchedProfileId)) {
                matchedProfileIdsAlreadyOnConversationsHelper.push(matchedProfileId);
                return messageItem;
            }
        });

        //add matchedProfile info into each conversationItem:
        const conversationsFinal = conversationsHelper.map(message => {
            const matchedProfileId = message.userId_1 == id ? message.userId_2 : message.userId_1;

            const matchedProfile = matchedProfiles.filter(item => item.id == matchedProfileId)[0];

            return { ...message, matchedProfile };
        });

        setConversations(conversationsFinal);
    }

    const ConversationItemFL = ({ item }: any) => <ConversationItem
        matchedProfile={item.matchedProfile}
        conversationItem={item}
    />

    return <GenericDataList
        data={conversations}
        renderItem={ConversationItemFL}
    />
}

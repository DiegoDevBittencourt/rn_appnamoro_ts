import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ConversationItem from './ConversationItem';
import { GenericDataList } from '@components/index';
import { useMongodb } from '~/store/mongodb/reducer';
import { useMatch } from '~/store/match/reducer';
import { useUsers } from '~/store/users/reducer';

export default function ConversationsContent() {

    const { realTimeMongodbChat } = useSelector(useMongodb);
    const { matchedProfiles } = useSelector(useMatch);
    const { userData } = useSelector(useUsers);

    const [conversations, setConversations] = useState<any>([]);

    useEffect(() => {
        updateConversationsArray();
    }, [realTimeMongodbChat]);

    const updateConversationsArray = () => {
        //each conversation item should contain user name and last message sent
        const matchedProfileIds: any[] = [];

        const messages = realTimeMongodbChat?.filter(messageItem => {
            const matchedProfileId = messageItem.userId_receiver == userData?.id ? messageItem.userId_receiver : messageItem.userId_receiver;

            if (!matchedProfileIds.includes(matchedProfileId)) {
                matchedProfileIds.push(matchedProfileId);
                return messageItem;
            }
        });

        const conversationItems = messages?.map(messageItem => {
            const matchedProfileId = messageItem.userId_receiver == userData?.id ? messageItem.userId_receiver : messageItem.userId_receiver;
            console.log('234matchedProfiles', matchedProfiles)
            const matchedProfile = matchedProfiles.filter(item => item.id == matchedProfileId)[0];

            return { messageItem, matchedProfile };
        });
        console.log('conversationItems', conversationItems)
        setConversations(conversationItems);
    }

    const ConversationItemFL = ({ item }: any) => <ConversationItem
        conversationItem={item}
    />

    return <GenericDataList
        data={conversations}
        renderItem={ConversationItemFL}
    />
}

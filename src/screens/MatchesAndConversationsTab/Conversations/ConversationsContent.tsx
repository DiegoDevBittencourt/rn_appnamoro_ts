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
        const chat = realTimeMongodbChat?.filter(item => userData?.id == item?.userId_sender || userData?.id == item?.userId_receiver).reverse();

        const messages = chat?.filter(messageItem => {

            const matchedProfileId = messageItem.userId_receiver != userData?.id ? messageItem.userId_receiver : messageItem.userId_sender;

            if (!matchedProfileIds.includes(matchedProfileId)) {
                matchedProfileIds.push(matchedProfileId);
                return messageItem;
            }
        });

        const conversationItems: any[] = [];

        messages?.map(messageItem => {
            const matchedProfileId = messageItem?.userId_receiver == userData?.id ? messageItem?.userId_sender : messageItem?.userId_receiver;
            const matchedProfile = matchedProfiles.filter(item => item?.id == matchedProfileId)[0];

            if (matchedProfile != undefined) {
                conversationItems.push({ messageItem, matchedProfile });
            }
        });

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

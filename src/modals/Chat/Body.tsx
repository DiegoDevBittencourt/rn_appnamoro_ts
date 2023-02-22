import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MessageItem from './MessageItem';
import TipItem from './TipItem';
import { GenericDataList } from '@components/index';
import { useMongodb } from '~/store/mongodb/reducer';
import { useUsers } from '~/store/users/reducer';

const Body = ({ matchedProfile, profileImage }: any) => {

    const { realTimeMongodbChat } = useSelector(useMongodb);
    const { userData } = useSelector(useUsers);
    const { id: userId } = userData;

    const [chatMessages, setChatMessages] = useState<any>([]);

    useEffect(() => {
        const messages = realTimeMongodbChat?.filter(item =>
            (item?.userId_sender == matchedProfile?.id && item?.userId_receiver == userData?.id)
            || (item?.userId_sender == userData?.id && item?.userId_receiver == matchedProfile?.id) && item
        );
        setChatMessages(messages?.reverse());
    }, [realTimeMongodbChat]);

    const MessageItemFL = ({ item }: any) => <MessageItem userId={userId} messageItem={item} />

    return <>
        {
            chatMessages.length > 0 ? <GenericDataList
                inverted
                customContentContainerStyle={{ paddingTop: 5 }}
                data={chatMessages}
                renderItem={MessageItemFL}
            /> : <TipItem profileImage={profileImage} />
        }
    </>
}

export default Body;

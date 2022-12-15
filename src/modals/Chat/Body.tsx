import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MessageItem from './MessageItem';
import TipItem from './TipItem';
import { GenericDataList } from '@components/index';
import { useFirebase } from '~/store/firebase/reducer';
import { useUsers } from '~/store/users/reducer';

const Body = ({ matchedProfile, profileImage }: any) => {

    const { realTimeFirebaseChat } = useSelector(useFirebase);
    const { userData } = useSelector(useUsers);
    const { id: userId } = userData;

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        // setChatMessages(realTimeFirebaseChat.filter(item =>
        //     item.userId_1 == matchedProfile?.id || item.userId_2 == matchedProfile?.id && item
        // ));
    }, [realTimeFirebaseChat]);

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

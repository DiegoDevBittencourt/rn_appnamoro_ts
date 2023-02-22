import React from 'react';
import { useNavigation } from '@react-navigation/native';

import noProfile from '@assets/noProfile.png';
import { theme } from '@constants/styledComponentsTheme';
import { RoundImage } from '@components/index';
import { formatDateToHHMM, setLimitCharactereSizeToString } from '~/utils/functions';
import { Button, MainContainer, PMessage, PTime, PTitle, TextContainer, TimeContainer } from './styles';
import { CHAT_MODAL } from '~/constants/screenNames';
import { useSelector } from 'react-redux';
import { useUsers } from '~/store/users/reducer';

export default function ConversationItem({ conversationItem }: any) {

    const { push } = useNavigation<any>();

    const { messageItem, matchedProfile } = conversationItem;
    const { firstName, lastName, userImages } = matchedProfile || { firstName: '', lastName: '' };
    const { userData } = useSelector(useUsers);

    const profileImage = userImages?.length > 0 ? { uri: userImages[0]?.imageUrl } : noProfile;

    const openChatScreen = () => push(CHAT_MODAL, { profileImage, matchedProfile });

    return <Button underlayColor={theme.$lightGray} onPress={openChatScreen}>
        <MainContainer>

            <RoundImage customImageStyle={{ marginLeft: 5 }} source={profileImage} />

            <TextContainer>
                <PTitle>{setLimitCharactereSizeToString(`${firstName} ${lastName}`, 30)}</PTitle>
                <PMessage>
                    {messageItem?.userId_sender == userData?.id && 'Você: '}
                    {setLimitCharactereSizeToString(messageItem?.message, 37)}
                </PMessage>
            </TextContainer>

            <TimeContainer>
                <PTime>{formatDateToHHMM(messageItem?.created_at)}</PTime>
            </TimeContainer>

        </MainContainer>
    </Button>
}

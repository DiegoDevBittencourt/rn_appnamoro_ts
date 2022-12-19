import React from 'react';
import { useNavigation } from '@react-navigation/native';

import noProfile from '@assets/noProfile.png';
import { theme } from '@constants/styledComponentsTheme';
import { RoundImage } from '@components/index';
import { setLimitCharactereSizeToString } from '~/utils/functions';
import { Button, MainContainer, PMessage, PTime, PTitle, TextContainer, TimeContainer } from './styles';
import { CHAT_MODAL } from '~/constants/screenNames';

export default function ConversationItem({ conversationItem, matchedProfile }: any) {

    const navigation = useNavigation<any>();

    const { hourMinute, message } = conversationItem;
    const { firstName, lastName, userImages } = matchedProfile || { firstName: '', lastName: '' };

    const profileImage = userImages?.length > 0 ? { uri: userImages[0]?.imageUrl } : noProfile;

    const openChatScreen = () => navigation.push(CHAT_MODAL, { profileImage, matchedProfile });

    return <Button underlayColor={theme.$lightGray} onPress={openChatScreen}>
        <MainContainer>

            <RoundImage customImageStyle={{ marginLeft: 5 }} source={profileImage} />

            <TextContainer>
                <PTitle>{setLimitCharactereSizeToString(`${firstName} ${lastName}`, 30)}</PTitle>
                <PMessage>{setLimitCharactereSizeToString(message, 37)}</PMessage>
            </TextContainer>

            <TimeContainer>
                <PTime>{hourMinute}</PTime>
            </TimeContainer>

        </MainContainer>
    </Button>
}

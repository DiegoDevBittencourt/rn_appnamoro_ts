import React from 'react';
import { useNavigation } from '@react-navigation/native';

import noProfile from '@assets/noProfile.png';
import { theme } from '@constants/StyledComponentsTheme';
import { RoundImage, P } from '@components/index';
import { setLimitCharactereSizeToString } from '~/utils/functions';
import { MatchItemButton, MatchItemContainer } from './styles';

export default function MatchItem({ matchedProfile }: any) {

    const navigation = useNavigation<any>();

    const { userImages, firstName } = matchedProfile;

    const profileImage = userImages.length > 0 ? { uri: userImages[0].imageUrl } : noProfile;

    const openChatScreen = () => navigation.push('ChatModal', { profileImage, matchedProfile });

    return <MatchItemContainer>

        <MatchItemButton underlayColor={theme.$lightGray} onPress={openChatScreen}>
            <RoundImage customImageStyle={{ height: '100%', width: '100%' }} source={profileImage} />
        </MatchItemButton>

        <P>{setLimitCharactereSizeToString(firstName, 11)}</P>

    </MatchItemContainer>
}
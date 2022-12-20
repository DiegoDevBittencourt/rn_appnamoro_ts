import React from 'react';
import { BlurView } from "@react-native-community/blur";
import { StyleSheet } from 'react-native';

import itsAMatch from '@assets/itsAMatch.png';
import noProfile from '@assets/noProfile.png';
import { AppLogo, GenericAppButton } from '~/components';
import { useSelector } from 'react-redux';
import { useUsers } from '~/store/users/reducer';
import { useNavigation } from '@react-navigation/native';
import { useMatch } from '~/store/match/reducer';
import { MATCHES_AND_CONVERSATIONS_TAB_SCREEN } from '~/constants/screenNames';
import {
    DescriptionText,
    MainContainer,
    UserImage,
    UsersImagesContainer,
    ContentContainer,
    ControlButtonsContainer
} from './styles';

const ItsAMatch = () => {

    const { goBack, navigate } = useNavigation<any>();
    const { userData } = useSelector(useUsers);
    const { userImages } = userData;
    const { currentMatchedProfile } = useSelector(useMatch);
    const { userImages: matchedProfileImages } = currentMatchedProfile;

    const currentUserImageSource = userImages && userImages.length > 0 ? { uri: userImages[0].imageUrl } : noProfile
    const currentMatchedProfileImageSource = matchedProfileImages && matchedProfileImages.length > 0 ?
        { uri: matchedProfileImages[0].imageUrl } : noProfile

    const customButtonStyle = {
        flex: 1,
        width: 280
    }

    const handleSendMessageClick = () => {
        navigate(MATCHES_AND_CONVERSATIONS_TAB_SCREEN);
    }

    return <MainContainer>

        <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={3}
            reducedTransparencyFallbackColor="white"
        />

        <ContentContainer>
            <AppLogo style={{ height: 50 }} source={itsAMatch} />

            <DescriptionText>{`Você e ${currentMatchedProfile?.firstName} gostaram um do outro!`}</DescriptionText>

            <UsersImagesContainer>
                <UserImage source={currentUserImageSource} />
                <UserImage source={currentMatchedProfileImageSource} />
            </UsersImagesContainer>

            <ControlButtonsContainer>
                <GenericAppButton
                    customButtonStyle={customButtonStyle}
                    textButton={'Enviar Mensagem'}
                    iconName={'comments'}
                    solidIcon
                    onPress={handleSendMessageClick}
                />

                <GenericAppButton
                    customButtonStyle={{
                        ...customButtonStyle,
                        backgroundColor: 'transparent',
                        borderColor: 'white',
                        borderWidth: 2,
                        marginTop: 10
                    }}
                    iconName={'caret-left'}
                    textButton={'Continuar Deslizando'}
                    onPress={() => goBack()}
                />
            </ControlButtonsContainer>
        </ContentContainer>

    </MainContainer>
}

export default ItsAMatch;

const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

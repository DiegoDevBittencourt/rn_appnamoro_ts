import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import noProfile from '@assets/noProfile.png';
import ControlButton from './ControlButton';
import { generateRandomKey } from '~/utils/functions';
import { AwesomeIcon } from '@components/index';
import { textShadow } from '@constants/InlineStyling';
import { theme } from '@constants/styledComponentsTheme';
import { useMatch } from '~/store/match/reducer';
import { ControlButtonContainer, Distance, NameAge, ProfileCardInfo, UserImage } from './styles';

const ProfileCard = () => {

    const { availableProfilesToMatch } = useSelector(useMatch);
    const { firstName, lastName, age, userImages, distance } = availableProfilesToMatch[0];

    const [imageIndex, setImageIndex] = useState(0);

    const customIconStyle = {
        color: 'white',
        width: 20,
        textAlign: 'center'
    };

    const customIconContainer = {
        width: 30,
        alignItems: 'flex-end'
    };

    return <ProfileCardInfo>
        <UserImage key={generateRandomKey(1, 999999)} source={
            userImages?.length > 0 ? { uri: userImages[imageIndex]?.imageUrl } : noProfile
        } />

        <ControlButtonContainer>
            {imageIndex > 0 && <ControlButton
                style={{
                    alignSelf: 'flex-start',
                    borderTopLeftRadius: theme?.$bigBorderRadius,
                    borderBottomLeftRadius: theme?.$bigBorderRadius,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                }}
                onPress={() => setImageIndex((state) => state - 1)}
                textButton={'＜'}
            />}

            <View style={{ flex: 1, backgroundColor: 'transparent' }}></View>

            {imageIndex + 1 < userImages?.length && <ControlButton
                onPress={() => setImageIndex((state) => state + 1)}
                textButton={'＞'}
            />}
        </ControlButtonContainer>

        <NameAge style={textShadow}>{`${firstName} ${lastName}, ${age}`}</NameAge>

        <Distance style={textShadow}>
            <AwesomeIcon
                customIconContainer={customIconContainer}
                iconName='map-marker-alt'
                customIconStyle={{ ...textShadow, ...customIconStyle }}
            />
            {`a ${distance === 0 ? 'menos de 1' : distance}km daqui`}
        </Distance>

    </ProfileCardInfo>
}

export default ProfileCard;

import React from 'react';
import Carousel from 'react-native-looped-carousel';

import noProfile from '@assets/noProfile.png';
import { generateRandomKey } from '~/utils/functions';
import { AwesomeIcon } from '@components/index';
import { textShadow } from '@constants/InlineStyling';
import { Distance, NameAge, ProfileCardInfo, UserImage } from './styles';

const ProfileCard = ({ firstName, lastName, age, userImages, distance }: any) => {

    const arrowStyle = {
        color: 'white',
        fontSize: 22,
        margin: 20
    };

    const customIconStyle = {
        color: 'white',
        width: 20,
        textAlign: 'center'
    };

    const customIconContainer = {
        width: 30,
        alignItems: 'flex-end',
    };

    return <ProfileCardInfo>
        <Carousel
            style={{ width: '100%', height: '100%' }}
            arrowStyle={{ height: '100%', justifyContent: 'center' }}
            pageInfoTextStyle={{ color: 'white' }}
            pageInfoBottomContainerStyle={{ height: 20, position: 'absolute', top: 10 }}
            leftArrowText={'＜'}
            leftArrowStyle={[arrowStyle, textShadow]}
            rightArrowText={'＞'}
            rightArrowStyle={[arrowStyle, textShadow]}
            pageInfo
            arrows
            swipe={false}
            isLooped={false}
            autoplay={false}
        >
            {
                userImages?.length > 0 ?
                    userImages.map((image: any) => <UserImage key={generateRandomKey()} source={{ uri: image?.imageUrl }} />)
                    :
                    <UserImage source={noProfile} />
            }
        </Carousel>

        <NameAge style={textShadow}>{`${firstName} ${lastName}, ${age}`}</NameAge>

        <Distance style={textShadow}>
            <AwesomeIcon customIconContainer={customIconContainer} iconName='map-marker-alt' customIconStyle={{ ...textShadow, ...customIconStyle }} />
            {`a ${distance === 0 ? 'menos de 1' : distance}km daqui`}
        </Distance>

    </ProfileCardInfo>
}

export default ProfileCard;

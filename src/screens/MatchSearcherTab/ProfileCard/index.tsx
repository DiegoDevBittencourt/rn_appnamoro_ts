import React from 'react';
// import Carousel from 'react-native-looped-carousel';
import { ImageSlider } from "react-native-image-slider-banner";

import noProfile from '@assets/noProfile.png';
import { generateRandomKey } from '~/utils/functions';
import { AwesomeIcon } from '@components/index';
import { textShadow } from '@constants/InlineStyling';
import { theme } from '@constants/styledComponentsTheme';
import { Distance, NameAge, ProfileCardInfo, UserImage } from './styles';
import { Dimensions } from 'react-native';

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
        <ImageSlider
            data={userImages?.map((item: any) => ({ ...item, img: item?.imageUrl }))}
            autoPlay={false}
            caroselImageStyle={{
                height: '100%',
                width: Dimensions.get('window').width - 20,
                borderRadius: theme?.$bigBorderRadius
            }}
            closeIconColor="#fff"
        />
        {/* <Carousel
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
        > */}
        {
            userImages?.length > 0 ?
                userImages.map((image: any) => <UserImage key={generateRandomKey(1, 999999)} source={{ uri: image?.imageUrl }} />)
                :
                <UserImage source={noProfile} />
        }
        {/* </Carousel> */}

        <NameAge style={textShadow}>{`${firstName} ${lastName}, ${age}`}</NameAge>

        <Distance style={textShadow}>
            <AwesomeIcon customIconContainer={customIconContainer} iconName='map-marker-alt' customIconStyle={{ ...textShadow, ...customIconStyle }} />
            {`a ${distance === 0 ? 'menos de 1' : distance}km daqui`}
        </Distance>

    </ProfileCardInfo>
}

export default ProfileCard;

import React from 'react';
import { useSelector } from 'react-redux';

import noProfile from '@assets/noProfile.png';
import { useUsers } from '~/store/users/reducer';
import { P1, P2, UserImage, UserPersonalInfoContainer } from './styles';

const UserPersonalInfo = () => {

    const { userData } = useSelector(useUsers);
    const {
        userImages,
        firstName,
        lastName,
        age,
        position,
        schooling
    } = userData;

    const imageSource = userImages && userImages.length > 0 ? { uri: userImages[0].imageUrl } : noProfile

    return <UserPersonalInfoContainer>

        <UserImage source={imageSource} />

        <P1>{`${firstName || ''} ${lastName || ''}, ${age || ''}`}</P1>

        <P2>{position}</P2>

        <P2>{schooling?.label}</P2>

    </UserPersonalInfoContainer>
}

export default UserPersonalInfo;

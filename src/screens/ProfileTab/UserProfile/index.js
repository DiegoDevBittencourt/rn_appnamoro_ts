import React from 'react';

import { DevelopedBy, AppVersion } from '@components/index';
import { ProfileScreenContainer } from './styles';
// import ProfileCircle from './ProfileCircle';

export default function UserProfile() {

    return <ProfileScreenContainer>

        {/* <ProfileCircle /> */}

        <DevelopedBy />

        <AppVersion />

    </ProfileScreenContainer>
}

import React from 'react';

import ProfileCircle from './ProfileCircle';
import { DevelopedBy, AppVersion } from '@components/index';
import { ProfileScreenContainer } from './styles';

export default function UserProfile() {

    return <ProfileScreenContainer>

        <ProfileCircle />

        <DevelopedBy />

        <AppVersion />

    </ProfileScreenContainer>
}

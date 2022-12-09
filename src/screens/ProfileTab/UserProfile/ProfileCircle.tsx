import React from 'react';

import UserPersonalInfo from './UserPersonalInfo';
import ControlButtons from './ControlButtons';
import { TheCircle } from './styles';

export default function ProfileCircle() {
    return <TheCircle>

        <UserPersonalInfo />

        <ControlButtons />

    </TheCircle>
}

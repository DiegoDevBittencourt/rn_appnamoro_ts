import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from './UserProfile';
import Configuration from './Configuration';
import EditInfo from './EditInfo';
import EmailEditor from './Configuration/EmailEditor';
import LocationEditor from './Configuration/LocationEditor';
import PhoneEditor from './Configuration/PhoneEditor';
import SearchingByEditor from './Configuration/SearchingByEditor';
import {
    CONFIGURATION_SCREEN,
    EDIT_INFO_SCREEN,
    EMAIL_EDITOR_SCREEN,
    LOCATION_EDITOR_SCREEN,
    PHONE_EDITOR_SCREEN,
    SEARCHING_BY_EDITOR_SCREEN,
    USER_PROFILE_SCREEN
} from '~/constants/screenNames';

const ProfileNavigator = createStackNavigator();

const TheNavigator = () => {
    return <ProfileNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName={USER_PROFILE_SCREEN}>

        <ProfileNavigator.Screen name={USER_PROFILE_SCREEN} component={UserProfile} />
        <ProfileNavigator.Screen name={CONFIGURATION_SCREEN} component={Configuration} />
        <ProfileNavigator.Screen name={EDIT_INFO_SCREEN} component={EditInfo} />

        <ProfileNavigator.Screen name={EMAIL_EDITOR_SCREEN} component={EmailEditor} />
        <ProfileNavigator.Screen name={LOCATION_EDITOR_SCREEN} component={LocationEditor} />
        <ProfileNavigator.Screen name={PHONE_EDITOR_SCREEN} component={PhoneEditor} />
        <ProfileNavigator.Screen name={SEARCHING_BY_EDITOR_SCREEN} component={SearchingByEditor} />

    </ProfileNavigator.Navigator>
}

const ProfileStackNavigator = () => {
    return <TheNavigator />
};

export default ProfileStackNavigator;

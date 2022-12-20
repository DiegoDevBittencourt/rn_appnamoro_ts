import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from '@constants/styledComponentsTheme';
import { AwesomeIcon } from '@components/index';
import { IconContainer } from './styles';
import MatchSearcherTab from '@screens/MatchSearcherTab';
import MatchesAndConversationsTab from '@screens/MatchesAndConversationsTab';
import ProfileStackNavigator from '@screens/ProfileTab/ProfileStackNavigator';
import {
    MATCHES_AND_CONVERSATIONS_TAB_SCREEN,
    MATCH_SEARCHER_TAB_SCREEN,
    USER_PROFILE_TAB_SCREEN
} from '~/constants/screenNames';

const Tab = createMaterialTopTabNavigator();

const Icon = (props: { iconColor: any, iconName: string }) => {
    return (
        <IconContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AwesomeIcon
                customIconStyle={{ color: props.iconColor, marginBottom: 8 }}
                solidIcon
                iconName={props.iconName}
            />
        </IconContainer>
    );
}

const screenOptions = (iconName: string) => {
    return { gestureEnabled: true, tabBarIcon: ({ color }: any) => <Icon iconColor={color} iconName={iconName} /> }
}

const TabNavigator = () => {
    return <Tab.Navigator
        swipeEnabled={false}
        tabBarPosition='bottom'
        tabBarOptions={{
            activeTintColor: theme.$primaryColor,
            inactiveTintColor: theme.$lightGray,
            indicatorStyle: { backgroundColor: 'transparent' },
            showIcon: true,
            showLabel: false
        }}>
        <Tab.Screen name={MATCH_SEARCHER_TAB_SCREEN} options={screenOptions('heart')} component={MatchSearcherTab} />
        <Tab.Screen name={MATCHES_AND_CONVERSATIONS_TAB_SCREEN} options={screenOptions('comments')} component={MatchesAndConversationsTab} />
        <Tab.Screen name={USER_PROFILE_TAB_SCREEN} options={screenOptions('user-alt')} component={ProfileStackNavigator} />
    </Tab.Navigator>
}

export default function DashboardTabNavigator() {
    return <TabNavigator />
}

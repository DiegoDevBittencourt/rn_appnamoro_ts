import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '@screens/Login';
import Dashboard from '@screens/Dashboard';
import ForgotPasswordModal from '@modals/ForgotPassword';
import SignUpModal from '@modals/SignUp';
import GenericYesNoModal from '@modals/GenericYesNoModal';
import ContactModal from '@modals/Contact';
// import TurnOnLocationModal from '@modals/TurnOnLocation';
// import CompleteYourProfileModal from '@modals/CompleteYourProfile';
// import ChatModal from '@modals/Chat';
import { modalOptions } from '@constants/ModalOptions';
import {
    CONTACT_MODAL,
    DASHBOARD_SCREEN,
    FORGOT_PASSWORD_MODAL,
    GENERIC_YES_NO_MODAL,
    LOGIN_SCREEN,
    SIGN_UP_MODAL
} from '~/constants/screenNames';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackNavigator = () => {
    return <MainStack.Navigator screenOptions={{ headerShown: false, headerMode: 'screen' }} initialRouteName={DASHBOARD_SCREEN} >
        <MainStack.Screen name={LOGIN_SCREEN} component={Login} />
        <MainStack.Screen name={DASHBOARD_SCREEN} component={Dashboard} />
    </MainStack.Navigator>
}

const RootStackNavigator = () => {
    return <RootStack.Navigator screenOptions={{ headerShown: false, headerMode: 'float' }} >
        <RootStack.Screen name="MainStack" component={MainStackNavigator} />
        <RootStack.Screen options={modalOptions} name={FORGOT_PASSWORD_MODAL} component={ForgotPasswordModal} />
        <RootStack.Screen options={modalOptions} name={SIGN_UP_MODAL} component={SignUpModal} />
        <RootStack.Screen options={modalOptions} name={GENERIC_YES_NO_MODAL} component={GenericYesNoModal} />
        <RootStack.Screen options={modalOptions} name={CONTACT_MODAL} component={ContactModal} />
        {/*  <RootStack.Screen options={modalOptions} name="CompleteYourProfileModal" component={CompleteYourProfileModal} />
            <RootStack.Screen options={modalOptions} name="TurnOnLocationModal" component={TurnOnLocationModal} />
            <RootStack.Screen options={modalOptions} name="ChatModal" component={ChatModal} /> */}
    </RootStack.Navigator>
}

const Application = () => {
    return <RootStackNavigator />
};

export default Application;

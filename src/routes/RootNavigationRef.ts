import { CommonActions } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';

type RootStackParamList = {
    screen: string;
    params: any;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function getCurrentRoutName() {
    console.log('navigationRef.current?.getCurrentRoute()', navigationRef.current?.getCurrentRoute())
    return navigationRef.current?.getCurrentRoute();
}

export function push(screen: string, params: any) {
    return null
    //navigationRef.navigate({ name: screen });
}

export function reset(name: string) {
    navigationRef.current?.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name }],
    }));
}

export function goBack() {
    navigationRef.current?.dispatch(CommonActions.goBack());
}

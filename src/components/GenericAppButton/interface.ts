import { TouchableHighlightProps, ViewStyle } from 'react-native';

export interface GenericAppButtonType extends TouchableHighlightProps {
    customButtonStyle?: any,
    textButton?: string,
    enable?: boolean
}

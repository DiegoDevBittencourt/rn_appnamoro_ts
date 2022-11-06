import { TouchableHighlightProps, ViewStyle } from 'react-native';

export interface GenericAppButtonType extends TouchableHighlightProps {
    customButtonStyle?: ViewStyle,
    textButton?: string,
    enable?: boolean
}

import { TouchableHighlightProps, ViewStyle } from 'react-native';
import { AwesomeIconType } from '../AwesomeIcon/interface';

export interface RoundCloseButtonType extends TouchableHighlightProps, AwesomeIconType {
    customButtonStyle?: ViewStyle
}

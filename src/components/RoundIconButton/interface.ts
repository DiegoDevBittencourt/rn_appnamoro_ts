import { TouchableHighlightProps, ViewStyle } from 'react-native';
import { AwesomeIconType } from '../AwesomeIcon/interface';

export interface RoundIconButtonType extends TouchableHighlightProps, AwesomeIconType {
    customButtonStyle?: ViewStyle,
    customIconStyle?: any,
}

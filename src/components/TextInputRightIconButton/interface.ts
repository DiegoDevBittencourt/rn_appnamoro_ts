import { ViewStyle, TextInputProps } from "react-native";
import { AwesomeIconType } from '../AwesomeIcon/interface';

export interface TextInputRightIconButtonType extends TextInputProps, AwesomeIconType {
    reference?: any,
    customInputStyle?: ViewStyle,
    showRightButton?: boolean,
    customButtonStyle?: ViewStyle,
    onButtonPress?: any,
    underlayColor?: string,
    customContainerStyle?: ViewStyle
}

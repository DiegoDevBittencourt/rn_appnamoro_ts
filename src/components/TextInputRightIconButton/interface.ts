import { ReturnKeyTypeOptions, ViewStyle } from "react-native";
import { AwesomeIconType } from '../AwesomeIcon/interface';

export interface TextInputRightIconButtonType extends AwesomeIconType {
    placeholder?: string,
    value?: string,
    onChangeText?: any,
    secureTextEntry?: boolean,
    returnKeyType?: ReturnKeyTypeOptions,
    onSubmitEditing?: any,
    keyboardType?: string,
    reference?: any,
    showRightButton?: boolean,
    customButtonStyle?: ViewStyle,
    underlayColor?: string,
    multiline?: boolean,
    customContainerStyle?: ViewStyle,
    customInputStyle?: ViewStyle,
    textAlignVertical?: string,
    onButtonPress?: any,
}

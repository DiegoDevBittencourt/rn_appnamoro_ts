import { ViewStyle } from "react-native";

export interface MultiSliderType {
    values?: number[],
    title?: string,
    rightText?: string,
    min?: number | undefined,
    max?: number | undefined,
    onValuesChange?: any,
    onValuesChangeFinish?: any
    customContainerStyle?: ViewStyle
}

import { ListRenderItem, TouchableHighlightProps } from 'react-native';

export interface GenericDataListType extends TouchableHighlightProps {
    data?: any,
    renderItem?: ListRenderItem<unknown> | null | undefined,
    inverted?: boolean,
    horizontal?: boolean,
    customContentContainerStyle?: any,
}

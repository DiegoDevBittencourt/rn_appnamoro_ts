export interface RNModalSelectorDataType {
    key: number,
    section?: boolean,
    label?: string
}

export interface ModalSelectorType {
    selectedItem: RNModalSelectorDataType,
    title: string,
    data?: any,
    handleChange?: any
}

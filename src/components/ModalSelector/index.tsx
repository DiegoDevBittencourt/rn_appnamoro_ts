import React from 'react';

import { ModalSelectorType } from './interface';
import { MainContainer, RNModalSelectorCustom, TextContainer, PCustom } from './styles';

const ModalSelector = ({ selectedItem, title, data, handleChange }: ModalSelectorType) => {

    const titleSection = [
        { key: -1, section: true, label: title }
    ];

    return <MainContainer>
        <RNModalSelectorCustom
            data={titleSection.concat(data)}
            supportedOrientations={['portrait']}
            onChange={handleChange}>

            <TextContainer>
                <PCustom>{selectedItem?.label || title}</PCustom>
            </TextContainer>

        </RNModalSelectorCustom>
    </MainContainer>
}

export default ModalSelector;

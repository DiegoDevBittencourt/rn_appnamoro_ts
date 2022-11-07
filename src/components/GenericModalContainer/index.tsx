import React from 'react';

import RoundCloseButton from '../RoundCloseButton';
import { GenericModalContainerType } from './interface';
import { H2Custom, HeaderContainer, MainContainer, ModalContainer, ScrollViewCustom } from './styles';

const GenericModalContainer = ({ title, children, closeButtonPress, customTitleStyle }: GenericModalContainerType) => {
    return <MainContainer>
        <ModalContainer>

            <HeaderContainer>
                <RoundCloseButton onPress={closeButtonPress} />
                {title && <H2Custom style={customTitleStyle}>{title}</H2Custom>}
            </HeaderContainer>

            <ScrollViewCustom>
                {children}
            </ScrollViewCustom>

        </ModalContainer>
    </MainContainer>
}

export default GenericModalContainer;

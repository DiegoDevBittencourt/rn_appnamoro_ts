import React from 'react';

import { SectionTitleType } from './interface';
import { Container, Title } from './styles';

const SectionTitle = ({ titleText, customTitleStyle }: SectionTitleType) => {
    return <Container>
        <Title style={customTitleStyle}>{titleText}</Title>
    </Container>
}

export default SectionTitle;

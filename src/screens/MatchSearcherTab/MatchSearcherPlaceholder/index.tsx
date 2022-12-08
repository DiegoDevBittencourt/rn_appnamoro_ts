import React from 'react';
import { H2Custom, MainContainer, PCustom } from './styles';

export default function MatchSearcherPlaceholder({ title, bodyText }: { title?: string, bodyText?: string }) {
    return <MainContainer>
        <H2Custom>{title}</H2Custom>
        <PCustom>{bodyText}</PCustom>
    </MainContainer>
}

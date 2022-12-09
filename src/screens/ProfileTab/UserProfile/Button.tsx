import React from 'react';

import { RoundIconButton } from '@components/index';
import { ButtonContainer, PCustom } from './styles';

export default function Button(props: any) {
    return <ButtonContainer>

        <RoundIconButton {...props} />

        <PCustom>{props.buttonLabel}</PCustom>

    </ButtonContainer>
}

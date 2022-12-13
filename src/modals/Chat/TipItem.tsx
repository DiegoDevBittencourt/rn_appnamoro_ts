import React, { useEffect, useState } from 'react';

import { RoundImage } from '@components/index';
import { TipContainer, TipText } from './styles';

const tips = [
    'Quebre barreiras!',
    'Faça uma piada sobre si mesmo.',
    'Elogios nunca são demais!',
    'Seja artístico!',
    'Convidar para comer nunca fez mal a ninguém!',
    'Não tenha medo de ser vulnerável!'
];

const TipItem = ({ profileImage }: any) => {

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * tips.length);
    }

    const [tipIndex, setTipIndex] = useState(generateRandomNumber());

    useEffect(() => {
        //sets a random number to show a random tip message to the user:
        setTipIndex(generateRandomNumber());
    }, []);

    return <TipContainer>

        <RoundImage customImageStyle={{ height: 150, width: 150, borderRadius: 100 }} source={profileImage} />

        <TipText>{tips[tipIndex]}</TipText>

    </TipContainer>
}

export default TipItem;

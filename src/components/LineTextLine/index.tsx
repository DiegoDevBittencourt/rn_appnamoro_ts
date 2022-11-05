import React from 'react';

import P from '../P';
import { Line, LineTextLineContainer } from './styles';

const LineTextLine = ({ text }: { text: string }) => {
    return <LineTextLineContainer>
        <Line />
        <P style={{ padding: 5 }}>{text}</P>
        <Line />
    </LineTextLineContainer>
}

export default LineTextLine;

import React from 'react';

import { theme } from '@constants/styledComponentsTheme';
import {
    MessageBaloonContainer,
    MessageContainer,
    MessageText,
    TimeText
} from './styles';

export default class MessageItem extends React.PureComponent<any>{
    render() {
        const { messageItem, userId } = this.props;
        const { message, hourMinute, userId_sender } = messageItem;
        const { $myChatMessageColor, $notMyChatMessageColor, $bigBorderRadius, $textColor } = theme;

        const customMessageContainerStyle = {
            backgroundColor: userId_sender == userId ? $myChatMessageColor : $notMyChatMessageColor,
            borderBottomRightRadius: userId_sender == userId ? 0 : $bigBorderRadius,
            borderBottomLeftRadius: userId_sender != userId ? 0 : $bigBorderRadius
        };

        const customTextStyle = { color: userId_sender == userId ? 'white' : $textColor };

        const customTimeStyle = userId_sender == userId ? { right: 5 } : { left: 5 };

        return <MessageContainer style={{ alignItems: userId_sender == userId ? 'flex-end' : 'flex-start' }}>

            <MessageBaloonContainer style={customMessageContainerStyle}>

                <MessageText style={customTextStyle}>{message}</MessageText>
                <TimeText style={[customTextStyle, customTimeStyle]}>{hourMinute}</TimeText>

            </MessageBaloonContainer>

        </MessageContainer>
    }
}

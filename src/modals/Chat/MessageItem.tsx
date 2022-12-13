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
        const { message, hourMinute, userId_1 } = messageItem;
        const { $myChatMessageColor, $notMyChatMessageColor, $bigBorderRadius, $textColor } = theme;

        const customMessageContainerStyle = {
            backgroundColor: userId_1 == userId ? $myChatMessageColor : $notMyChatMessageColor,
            borderBottomRightRadius: userId_1 == userId ? 0 : $bigBorderRadius,
            borderBottomLeftRadius: userId_1 != userId ? 0 : $bigBorderRadius
        };

        const customTextStyle = { color: userId_1 == userId ? 'white' : $textColor };

        const customTimeStyle = userId_1 == userId ? { right: 5 } : { left: 5 };

        return <MessageContainer style={{ alignItems: userId_1 == userId ? 'flex-end' : 'flex-start' }}>

            <MessageBaloonContainer style={customMessageContainerStyle}>

                <MessageText style={customTextStyle}>{message}</MessageText>
                <TimeText style={[customTextStyle, customTimeStyle]}>{hourMinute}</TimeText>

            </MessageBaloonContainer>

        </MessageContainer>
    }
}

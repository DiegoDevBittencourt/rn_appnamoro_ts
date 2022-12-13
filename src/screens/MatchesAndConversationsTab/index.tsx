import React from 'react';

import Matches from './Matches';
import Conversations from './Conversations';
import { theme } from '@constants/styledComponentsTheme';
import { GenericContainer, SectionTitle } from '@components/index';
import { ConversationsContainer, MatchesContainer } from './styles';

export default function MatchesAndConversationsTab() {

    const CustomTitle = ({ title }: { title: string }) => <SectionTitle
        titleText={title}
        customTitleStyle={{
            color: theme.$primaryColor,
            fontSize: 16
        }}
    />

    return <GenericContainer style={{ backgroundColor: 'white' }}>

        <MatchesContainer>
            <CustomTitle title={'Suas Matches'} />
            <Matches />
        </MatchesContainer>

        <ConversationsContainer>
            <CustomTitle title={'Mensagens'} />
            <Conversations />
        </ConversationsContainer>

    </GenericContainer>
}

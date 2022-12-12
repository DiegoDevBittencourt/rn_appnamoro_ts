import React from 'react';

import { theme } from '@constants/StyledComponentsTheme';
import { Toolbar } from '@components/index';
import { goBack } from '~/routes/RootNavigationRef';

export default function ConfigToolbar() {
    return <Toolbar
        leftElement={'arrow-back'}
        customLeftElement={{ color: 'white' }}
        onLeftElementPress={() => goBack()}
        title={'Configurações'}
        customTitleText={{ alignSelf: 'flex-start', color: 'white' }}
        showSearchIcon={false}
        customContainerStyle={{ backgroundColor: theme.$primaryColor }}
    />
}

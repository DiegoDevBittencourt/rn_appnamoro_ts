import React from 'react';

import { ScrollViewCustom } from './styles';

const GenericScrollView = (props: any) => {
    return <ScrollViewCustom
        {...props}
        contentContainerStyle={{ alignItems: 'center' }}
        keyboardShouldPersistTaps='handled'>
        {props?.children}
    </ScrollViewCustom>
}

export default GenericScrollView;

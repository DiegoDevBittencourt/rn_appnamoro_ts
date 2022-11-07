import React from "react";

import SignUpFields from './SignUpFields';
import { GenericModalContainer } from '@components/index';
import { goBack } from "~/routes/RootNavigationRef";

const SignUp = () => {
    return <GenericModalContainer closeButtonPress={() => goBack()} title={'Criar nova conta'}>
        <SignUpFields />
    </GenericModalContainer>
}

export default SignUp;

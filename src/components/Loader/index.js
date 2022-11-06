import React from 'react';
import { Bars } from 'react-native-loader';
import { LoaderContainer } from './styles';

const Loader = () => {
    return <LoaderContainer>
        <Bars size={10} color={'white'} />
    </LoaderContainer>
}

export default Loader;

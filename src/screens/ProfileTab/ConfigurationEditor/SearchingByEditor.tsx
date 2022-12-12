import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// import * as userThunk from '~/store/users/thunk';
import { P, ConfigItem, GenericScrollView } from '@components/index';
import { useUsers } from '~/store/users/reducer';

const PCustom = styled(P)`
    margin-top: 15px;
    margin-left: 10px;
`;

const SearchingByEditor = () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(useUsers);
    const { key: searchingBy } = userData?.searchingBy;

    const updateSearchingBy = (value: number) => {
        // dispatch(userThunk.updateUser({ searchingBy: value }, true, true));
    }

    const InfoText = () => {
        switch (searchingBy) {
            case 0:
                return <PCustom>{'Você só verá homens na Descoberta'}</PCustom>;
            case 1:
                return <PCustom>{'Você só verá mulheres na Descoberta'}</PCustom>;
            default:
                return <PCustom>{'Você verá todos na Descoberta'}</PCustom>;
        }
    }

    return <GenericScrollView customStyle={{ marginTop: 10 }}>

        <ConfigItem
            leftText={'HOMENS'}
            rightIconName={searchingBy == 0 ? 'check' : 'none'}
            onPress={() => updateSearchingBy(0)}
        />

        <ConfigItem
            leftText='MULHERES'
            rightIconName={searchingBy == 1 ? 'check' : 'none'}
            onPress={() => updateSearchingBy(1)}
        />

        <ConfigItem
            leftText='TODOS'
            rightIconName={searchingBy == 2 ? 'check' : 'none'}
            onPress={() => updateSearchingBy(2)}
        />

        <InfoText />

    </GenericScrollView>
}

export default SearchingByEditor;

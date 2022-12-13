import React from "react";
import { useNavigation } from "@react-navigation/native";

import { GenericModalContainer, GenericAppButton } from '@components/index';
import { weFoundAProblem, turnOnLocation } from '@constants/InfoText';
import { PCustom, TurnOnLocationContainer } from "./styles";

export default function TurnOnLocation() {

    const navigation = useNavigation();

    return <TurnOnLocationContainer>
        <GenericModalContainer closeButtonPress={() => navigation?.goBack()} title={weFoundAProblem}>

            <PCustom>{turnOnLocation}</PCustom>

            <GenericAppButton
                customButtonStyle={{ margin: 30, width: 'auto' }}
                textButton={'ENTENDI'}
                onPress={() => navigation?.goBack()}
            />

        </GenericModalContainer>
    </TurnOnLocationContainer>
}

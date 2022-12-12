import React from "react";

import ContactContent from './ContactContent';
import { GenericModalContainer } from '@components/index';
import { useNavigation } from "@react-navigation/native";

export default function Contact() {

    const navigation = useNavigation();

    return <GenericModalContainer closeButtonPress={() => navigation?.goBack()} title={'Fale conosco!'}>
        <ContactContent />
    </GenericModalContainer>
}

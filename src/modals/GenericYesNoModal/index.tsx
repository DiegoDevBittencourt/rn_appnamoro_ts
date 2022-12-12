import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { GenericAppButton, GenericModalContainer } from '@components/index';
import { PCustom, ContentContainer } from "./styles";

export default function GenericYesNoModal(props: any) {

    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const {
        title,
        subtitle,
        acceptText,
        denyText,
        selectedMethod,
        selectedUserImageId,
        matchedProfile
    } = props.route.params;

    const customButtonStyle = {
        flex: 1,
        margin: 10,
        marginTop: 40,
        width: 'auto',
    }

    const handleClose = () => navigation?.goBack();

    const acceptMethod = () => {
        // try {
        //     switch (selectedMethod) {
        //         case 'genericYesNoModalDeleteAccount':
        //             handleClose();
        //             dispatch(dashboardThunk.deleteAccount());
        //             break;
        //         case 'genericYesNoModalUnmatch':
        //             dispatch(matchThunk.unmatch(matchedProfile?.id));
        //             break;
        //         case 'genericYesNoModalDeleteUserImage':
        //             dispatch(userThunk.deleteUserImage(selectedUserImageId));
        //             break;
        //         default:
        //             break;
        //     }
        // } catch (error) {
        //     handleError(error);
        // }
    }

    return <GenericModalContainer closeButtonPress={() => navigation?.goBack()} title={title.toUpperCase()}>

        <PCustom>{subtitle}</PCustom>

        <ContentContainer>
            <GenericAppButton
                customButtonStyle={customButtonStyle}
                textButton={denyText.toUpperCase()}
                onPress={handleClose}
            />

            <GenericAppButton
                customButtonStyle={customButtonStyle}
                textButton={acceptText.toUpperCase()}
                onPress={acceptMethod}
            />
        </ContentContainer>

    </GenericModalContainer>
}

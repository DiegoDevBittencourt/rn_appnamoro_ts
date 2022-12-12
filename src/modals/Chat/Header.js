import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { P, RoundCloseButton, RoundImage, RoundIconButton } from '@components/index';
import { convertDateFormatToDDMMYYYY } from '~/utils/functions';
import { theme } from '@constants/StyledComponentsTheme';
import { GENERIC_YES_NO_MODAL } from '~/constants/screenNames';

const HeaderContainer = styled.View`
    height: 80px;
    border-bottom-width: 0.9px;
    align-items: center;
    border-color: ${({ theme }) => theme.$lightGray};
    flex-direction: row;
    width: 100%;
`;

const PCustom = styled(P)`
    flex: 1;
    margin-left: 10px;
    font-size: 16px;
`;

const RightButtonsContainer = styled.View`
    width: ${({ theme }) => theme.$heightOfGenericComponent}px;
    height: 100%;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export default function Header({ matchedProfile, profileImage }) {

    const navigation = useNavigation();

    const closeChat = () => navigation.goBack();

    const unmatch = () => {
        navigation.push(GENERIC_YES_NO_MODAL, {
            matchedProfile,
            title: 'Desfazer match?',
            subtitle: 'Deseja mesmo desfazer essa match? Você pode não encontrar essa pessoa novamente na busca!',
            acceptText: 'DESFAZER',
            denyText: 'CANCELAR',
            selectedMethod: 'genericYesNoModalUnmatch'
        });
    }

    return (
        <HeaderContainer>

            <RoundImage customImageStyle={{ marginLeft: 5 }} source={profileImage} />

            <PCustom>
                {matchedProfile && `Você deu match com `}
                <PCustom style={{ fontWeight: 'bold' }}>{matchedProfile?.firstName.toUpperCase()}</PCustom>
                {`\nem ${convertDateFormatToDDMMYYYY(new Date(matchedProfile?.matchInfo[0].updatedAt))}`}
            </PCustom>

            <RightButtonsContainer>

                <RoundCloseButton
                    onPress={closeChat}
                    customButtonStyle={{
                        height: 40,
                        width: 40,
                        marginRight: 5,
                        color: theme.$primaryColor
                    }}
                />

                <RoundIconButton
                    customButtonStyle={{
                        height: 40,
                        width: 40,
                        margin: -1,
                        backgroundColor: 'white',
                        elevation: 0,
                    }}
                    customIconStyle={{ color: theme.$primaryColor }}
                    iconName={'user-alt-slash'}
                    underlayColor={theme.$lightGray}
                    onPress={unmatch}
                />

            </RightButtonsContainer>

        </HeaderContainer>
    )
}

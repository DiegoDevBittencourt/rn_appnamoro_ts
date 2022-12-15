import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { convertDateFormatToDDMMYYYY } from '~/utils/functions';
import { theme } from '@constants/styledComponentsTheme';
import { GENERIC_YES_NO_MODAL } from '~/constants/screenNames';
import { HeaderContainer, PCustom, RightButtonsContainer } from './styles';
import { RoundCloseButton, RoundIconButton, RoundImage } from '~/components';

const Header = ({ matchedProfile, profileImage }: any) => {

    const navigation = useNavigation<any>();

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
                        margin: 1,
                        marginRight: 5,
                        color: theme.$primaryColor
                    }}
                    iconName={'user-alt-slash'}
                />

                <RoundIconButton
                    onPress={unmatch}
                    customButtonStyle={{
                        height: 40,
                        width: 40,
                        margin: 1,
                        marginRight: 5,
                        backgroundColor: 'white',
                        elevation: 0,
                    }}
                    customIconStyle={{ color: theme.$primaryColor }}
                    iconName={'user-alt-slash'}
                    underlayColor={theme.$lightGray}
                />

            </RightButtonsContainer>

        </HeaderContainer>
    )
}

export default Header;

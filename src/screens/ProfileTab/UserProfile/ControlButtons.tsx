import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// import * as authThunk from '@store/auth/thunk';
import Button from './Button';
import { theme } from '@constants/styledComponentsTheme';
import { ControlButtonsContainer } from './styles';
import { CONFIGURATION_SCREEN, EDIT_INFO_SCREEN } from '~/constants/screenNames';
import { signOut } from '~/store/auth/thunk';

export default function ControlButtons() {

    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();

    const handleSignOut = () => {
        dispatch(signOut());
    }

    const handleConfigButtonClick = () => {
        navigation.push(CONFIGURATION_SCREEN);
    }

    const handleEditInfoButtonClick = () => {
        navigation.push(EDIT_INFO_SCREEN);
    }

    return <ControlButtonsContainer>

        <Button
            customButtonStyle={{ backgroundColor: 'white' }}
            iconName={'cog'}
            customIconStyle={{ color: theme.$gray }}
            buttonLabel={'CONFIGURAÇÕES'}
            underlayColor={theme.$lightGray}
            onPress={handleConfigButtonClick}
        />

        <Button
            customButtonStyle={{ backgroundColor: theme.$primaryColor, marginTop: 50 }}
            iconName={'sign-out-alt'}
            customIconStyle={{ color: 'white' }}
            buttonLabel={'SAIR'}
            underlayColor={theme.$darkPrimaryColor}
            onPress={handleSignOut}
        />

        <Button
            customButtonStyle={{ backgroundColor: 'white' }}
            iconName={'pencil-alt'}
            customIconStyle={{ color: theme.$gray }}
            buttonLabel={'EDITAR INFO'}
            underlayColor={theme.$lightGray}
            onPress={handleEditInfoButtonClick}
        />

    </ControlButtonsContainer>
}

import React, { useContext, useState } from 'react';
import { AppIcon, MainButton, MainContainer, MainHeading, MainParagraph } from '../../../components';
import { AppDataContext } from '../../../context';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../enums';
import { NativeModules } from 'react-native';

export const CheckYourEmailScreen = () => {
    const { appLang } = useContext(AppDataContext);
    const navigation = useNavigation<any>()

    const handleOpenEmailApp = () => {
        NativeModules.RNMailLauncher.launchMailApp();
    };

    return (
        <MainContainer disableJustifyContent>
            <AppIcon />
            <MainHeading heading={appLang.checkYourEmail} />
            <MainParagraph paragraph={appLang.emailInstructions} />
            <MainButton
                onPress={handleOpenEmailApp}
                buttonText={appLang.openEmailApp}
                dismissiveButton
            />
            <MainButton
                onPress={() => navigation.navigate(SCREENS.LOGIN)}
                buttonText={appLang.returnToLogin}
            />
        </MainContainer>
    );
};
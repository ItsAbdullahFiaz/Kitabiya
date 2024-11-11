import React, { useContext, useMemo, useState } from 'react';
import { AppIcon, Header, MainButton, MainContainer, MainHeading, MainParagraph } from '../../../components';
import { AppDataContext } from '../../../context';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../enums';
import { NativeModules, StyleSheet, View } from 'react-native';
import { useResponsiveDimensions } from '../../../hooks';

export const CheckYourEmailScreen = () => {
    const { appLang } = useContext(AppDataContext);
    const navigation = useNavigation<any>()
    const {hp,wp}=useResponsiveDimensions();

    const handleOpenEmailApp = () => {
        NativeModules.RNMailLauncher.launchMailApp();
    };

    const styles=useMemo(()=>{
        return StyleSheet.create({
            contentContainer:{
                marginTop:hp(90)
            },
            btn:{
                marginTop:hp(20)
            }
        })
    },[hp,wp])

    return (
        <MainContainer disableJustifyContent>
            <Header title="check email"/>
            <View style={styles.contentContainer}>
            <MainParagraph paragraph={appLang.emailInstructions} />
            <View style={styles.btn}>
            <MainButton
                onPress={handleOpenEmailApp}
                buttonText={appLang.openEmailApp}
                dismissiveButton
            />
            </View>
            <View style={styles.btn}>
            <MainButton
                onPress={() => navigation.navigate(SCREENS.LOGIN)}
                buttonText={appLang.returnToLogin}
            />
            </View>
            </View>
        </MainContainer>
    );
};
import React, { useContext, useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AppIcon, MainContainer } from '../../../components';
import { resetAndGo } from '../../../utils';
import { AUTH_STORAGE_KEY, STACK } from '../../../enums';
import { AppDataContext } from '../../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SplashScreen = () => {
    const { appTheme } = useContext(AppDataContext);
    const navigation = useNavigation()

    function onAuthStateChanged(user: any) {
        setTimeout(async () => {
            try {
                const savedAuthState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
                const isAuthenticated = user && savedAuthState;
                resetAndGo(navigation, isAuthenticated ? STACK.MAIN : STACK.ONBOARDING, null);
            } catch (error) {
                console.error('Error checking auth state:', error);
                resetAndGo(navigation, STACK.ONBOARDING, null);
            }
        }, 2000);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }
        })
    }, [])

    return (
        <MainContainer>
            <View style={styles.container}>
                <AppIcon />
            </View>
        </MainContainer>
    )
}
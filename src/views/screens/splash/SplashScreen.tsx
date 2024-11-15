import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AppIcon, MainContainer } from '../../../components';
import { resetAndGo } from '../../../utils';
import { STACK } from '../../../enums';

export const SplashScreen = () => {

    const navigation = useNavigation()

    function onAuthStateChanged(user: any) {
        console.log(user)
        setTimeout(() => {
            resetAndGo(navigation, user ? STACK.MAIN : STACK.ONBOARDING, null);
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
                alignItems: "center"
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
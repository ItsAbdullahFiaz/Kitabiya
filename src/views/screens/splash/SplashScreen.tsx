import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppIcon, MainContainer } from '../../../components';
import { resetAndGo } from '../../../utils';
import { STACK } from '../../../enums';

export const SplashScreen = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            resetAndGo(navigation, STACK.ONBOARDING, null)
        }, 2000);
    }, [navigation]);

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
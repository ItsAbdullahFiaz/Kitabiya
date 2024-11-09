import React, { useEffect, useMemo } from 'react'
import {StyleSheet, View} from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { AppIcon, MainContainer, MainHeading } from '../../../components';
import { resetAndGo } from '../../../utils';
import { SCREENS, STACK } from '../../../enums';

export const SplashScreen = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(StackActions.replace(SCREENS.GET_STARTED))
        }, 2000);
    }, [navigation]);

    const styles=useMemo(()=>{
        return StyleSheet.create({
            container:{
                flex:1,
                justifyContent:"center",
                alignItems:"center"
            }
        })
    },[])

    return (
        <MainContainer>
            <View style={styles.container}>
            <AppIcon />
            </View>
        </MainContainer>
    )
}
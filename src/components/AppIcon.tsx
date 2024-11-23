import { Image, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';

export const AppIcon = () => {
    const { wp, hp } = useResponsiveDimensions()

    const styles = useMemo(() => {
        return StyleSheet.create({
            imageContainer: {
                marginBottom: hp(2),
            },
            img: {
                height: hp(74),
                width: hp(210)
            }
        });
    }, [hp, wp]);

    return (
        <View style={styles.imageContainer}>
            <Image style={styles.img} source={require('../assets/images/appLogo.png')} />
        </View>
    )
}
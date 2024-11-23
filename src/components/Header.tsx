import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks'
import { TEXT_STYLE } from '../enums'
import { BackButton } from './BackButton'
import { AppDataContext } from '../context'

export const Header = ({ title }: any) => {
    const { appTheme } = useContext(AppDataContext);
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            Container: {
                flexDirection: "row",
                alignItems: "center",
                width: '100%'
            },
            title: {
                ...TEXT_STYLE.medium,
                flex: 1,
                fontSize: hp(24),
                fontWeight: "bold",
                color: appTheme.primaryTextColor,
                textAlign: "center",
                textTransform: "capitalize"
            },
            placeholder: {
                width: hp(40),
                height: hp(40),
            }
        });
    }, [hp, wp]);

    return (
        <View style={styles.Container}>
            <BackButton />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.placeholder} />
        </View>
    )
}
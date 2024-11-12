import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useResponsiveDimensions } from '../hooks'
import { AnyIcon, IconType } from './AnyIcon'
import { FONT, OTHER_COLORS } from '../enums'
import { BackButton } from './BackButton'

export const Header = ({ title }: any) => {
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            Container: {
                flexDirection: "row",
                alignItems: "center",
                width: '100%'
            },
            title: {
                flex: 1,
                fontSize: 24,
                fontWeight: "bold",
                color: OTHER_COLORS.black,
                fontFamily: FONT.PoppinsRegular,
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
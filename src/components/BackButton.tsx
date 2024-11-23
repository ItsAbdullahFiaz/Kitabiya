import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useResponsiveDimensions } from '../hooks'
import { AnyIcon, IconType } from './AnyIcon'
import { AppDataContext } from '../context'

export const BackButton = () => {
    const { appTheme } = useContext(AppDataContext);
    const navigation = useNavigation<any>()
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            btnContainer: {
                width: hp(40),
                height: hp(40),
                borderRadius: 20,
                backgroundColor: appTheme.secondaryBackground,
                justifyContent: "center",
                alignItems: "center",
                paddingRight: hp(3)
            }
        });
    }, [hp, wp]);

    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.goBack()}>
            <AnyIcon
                type={IconType.Ionicons}
                name="chevron-back-outline"
                size={hp(28)}
                color={appTheme.secondaryTextColor}
            />
        </TouchableOpacity>
    )
}
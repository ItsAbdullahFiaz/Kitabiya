import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../../../../hooks'
import { OTHER_COLORS } from '../../../../enums';

export const HeaderButtons = ({ children, onPress }: any) => {
    const { hp, wp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            btnContainer: {
                width: hp(36),
                height: hp(36),
                backgroundColor: OTHER_COLORS.white,
                borderRadius: hp(18),
                justifyContent: "center",
                alignItems: "center"
            }
        })
    }, [hp, wp, OTHER_COLORS])
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

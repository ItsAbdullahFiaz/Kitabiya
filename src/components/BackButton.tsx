import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useResponsiveDimensions } from '../hooks'
import { AnyIcon, IconType } from './AnyIcon'
import { FONT, OTHER_COLORS } from '../enums'

export const BackButton = ({title} : any) => {
    const navigation = useNavigation<any>()
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            btnContainer:{
                width:hp(40),
                height:hp(40),
                borderRadius:20,
                backgroundColor:OTHER_COLORS.backButtonBackground,
                justifyContent:"center",
                alignItems:"center",
                paddingRight:hp(3)
            }
        });
    }, [hp, wp,OTHER_COLORS,FONT]);

    return (
            <TouchableOpacity style={styles.btnContainer} onPress={()=>navigation.goBack()}>
                <AnyIcon 
                type={IconType.Ionicons}
                name="chevron-back-outline"
                size={hp(28)}
                color={OTHER_COLORS.primaryBlack}
                />
            </TouchableOpacity>
    )
}
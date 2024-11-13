import { StyleSheet,  TouchableOpacity } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../../../../hooks'
import { AppDataContext } from '../../../../context';

export const HeaderButtons = ({ children, onPress }: any) => {
    const {appTheme}=useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            btnContainer: {
                width: hp(36),
                height: hp(36),
                backgroundColor: appTheme.primaryBackground,
                borderRadius: hp(18),
                justifyContent: "center",
                alignItems: "center"
            }
        })
    }, [hp, wp])
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

import { StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';
import { StatusBar } from 'react-native';
import { OTHER_COLORS } from '../enums';

interface MainContainerProps {
    children: React.ReactNode,
    disableJustifyContent?: boolean
}

export const MainContainer = (props: MainContainerProps) => {
    const { children, disableJustifyContent } = props
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: OTHER_COLORS.white,
                padding: hp(16),
            },
        });
    }, [hp, wp, OTHER_COLORS]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"dark-content"} backgroundColor={OTHER_COLORS.white}/>
            {children}
        </View>
    )
}
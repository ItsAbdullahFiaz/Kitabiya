import { StyleSheet, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';
import { StatusBar } from 'react-native';
import { AppDataContext } from '../context';

interface MainContainerProps {
    children: React.ReactNode,
    disableJustifyContent?: boolean,
    fullWidth?: boolean
}

export const MainContainer = React.memo((props: MainContainerProps) => {
    const { appTheme } = useContext(AppDataContext);
    const { children, disableJustifyContent, fullWidth } = props
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: appTheme.primaryBackground,
                padding: fullWidth ? 0 : hp(16),
            },
        });
    }, [hp, wp, appTheme]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"dark-content"} backgroundColor={appTheme.primaryBackground} />
            {children}
        </View>
    )
})
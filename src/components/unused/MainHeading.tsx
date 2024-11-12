import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';

interface MainHeadingProps {
    heading: string
}

export const MainHeading = (props: MainHeadingProps) => {
    const { heading } = props
    const { wp, hp } = useResponsiveDimensions()
    const { appLang, appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            headingContainer: {
                marginBottom: hp(16),
            },
            heading: {
                color: appTheme.primary,
                fontSize: hp(22)
            }
        });
    }, [hp, wp, appTheme]);
    return (
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>{heading}</Text>
        </View>
    )
}
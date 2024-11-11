import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';
import { TEXT_STYLE } from '../enums';

interface MainParagraphProps {
    paragraph: string
}

export const MainParagraph = (props: MainParagraphProps) => {
    const { paragraph } = props
    const { wp, hp } = useResponsiveDimensions()
    const { appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            headingContainer: {
                marginBottom: hp(16),
            },
            heading: {
                ...TEXT_STYLE.medium,
                color: appTheme.primary,
                fontSize: hp(16)
            }
        });
    }, [hp, wp, appTheme]);
    return (
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>{paragraph}</Text>
        </View>
    )
}
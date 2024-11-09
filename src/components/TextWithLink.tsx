import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';
import { OTHER_TEXT_STYLE } from '../enums';
import { AppDataContext } from '../context';

interface TextWithLinkProps {
    onPress: () => void,
    text: string,
    buttonText: string
}

export const TextWithLink = (props: TextWithLinkProps) => {
    const { onPress, text, buttonText } = props
    const { wp, hp } = useResponsiveDimensions()
    const { appLang, appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flexDirection: 'row',
                marginTop: 50,
            },
            text: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.primary,
                fontSize: hp(12)
            },
            button: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.primary,
                fontSize: hp(14)
            }
        });
    }, [hp, wp]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.button}> {buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}
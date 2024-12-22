import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_SIZE, TEXT_STYLE } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';

interface GreetingsSectionProps {
    userName: string;
    appTheme: any;
}

export const GreetingsSection = ({ userName, appTheme }: GreetingsSectionProps) => {
    const { hp } = useResponsiveDimensions();

    return (
        <View style={styles(hp).greetingsHeader}>
            <Text style={[styles(hp).userName, { color: appTheme.tertiaryTextColor }]}>
                {`Hello, ${userName}`}
            </Text>
            <Text style={[styles(hp).slogan, { color: appTheme.secondaryTextColor }]}>
                Find your best book
            </Text>
        </View>
    );
};

const styles = (hp: any) => StyleSheet.create({
    greetingsHeader: {
        height: hp(60),
        paddingHorizontal: hp(16),
        marginBottom:6
    },
    userName: {
        fontSize: FONT_SIZE.h4,
        ...TEXT_STYLE.regular,
    },
    slogan: {
        ...TEXT_STYLE.medium,
        fontSize: FONT_SIZE.h2,
        textTransform: 'capitalize',
    },
});
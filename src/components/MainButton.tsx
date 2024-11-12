import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { DotIndicator } from 'react-native-indicators'
import { FONT_SIZE, TEXT_STYLE } from '../enums';
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';

interface MainButtonProps {
    onPress: () => void;
    buttonText: string;
    disableBtn?: boolean;
    isLoading?: boolean;
    dismissiveButton?: boolean
};

export const MainButton = (props: MainButtonProps) => {
    const { onPress, buttonText, disableBtn, isLoading, dismissiveButton } = props
    const { wp, hp } = useResponsiveDimensions();
    const { appLang, appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            button: {
                alignSelf: "center",
                width: "100%",
                // paddingVertical: hp(12),
                paddingHorizontal: wp(24),
                borderRadius: hp(8),
                backgroundColor: disableBtn || isLoading ? appTheme.disabled : dismissiveButton ? 'tansparent' : appTheme.primary,
                alignItems: "center",
                justifyContent: "center",
                height: hp(50),
                borderWidth: dismissiveButton ? hp(1) : 0,
                borderColor: appTheme.primary
            },
            buttonText: {
                ...TEXT_STYLE.medium,
                color: dismissiveButton ? appTheme.primaryTextColor : appTheme.quaternaryTextColor,
                fontSize: hp(FONT_SIZE.h3),
                marginHorizontal: wp(8),
                flexGrow: 0,
                flexShrink: 0,
                textTransform:"capitalize"
            }
        });
    }, [hp, wp, isLoading, disableBtn, appTheme]);

    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={disableBtn}>
            {!isLoading ? (
                <Text style={styles.buttonText}>{buttonText}</Text>
            ) : (
                <View>
                    <DotIndicator color={appTheme.primary} size={hp(10)} />
                </View>
            )}
        </TouchableOpacity>
    )
}
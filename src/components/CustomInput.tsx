import { View, TextInput, TouchableOpacity, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { useResponsiveDimensions } from '../hooks';
import { OTHER_COLORS, STATUS_COLORS, TEXT_STYLE } from '../enums';
import { AppDataContext } from '../context';
import { AnyIcon, IconType } from '.';

interface CustomInputProps {
    value: any,
    setValue: (text: any) => void,
    onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    placeholder: string,
    secureTextEntry?: boolean,
    textWrong?: string | boolean,
    bottomError?: boolean,
    twoLinesError?: boolean,
    pasteButton?: boolean,
    keyboardType?: string,
}

export const CustomInput = (props: CustomInputProps) => {
    const { value, setValue, onChange, placeholder, secureTextEntry, textWrong, bottomError, twoLinesError, pasteButton, keyboardType } = props
    const [isSecure, setSecure] = useState(true);
    const { appTheme } = useContext(AppDataContext);
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                marginBottom: bottomError ? hp(4) : hp(26)
            },
            inputView: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: appTheme.primaryLight,
                borderRadius: hp(8),
                borderWidth: 1,
                borderColor: appTheme.tansparentPrimary,
            },
            input: {
                ...TEXT_STYLE.regular,
                color: appTheme.textColor,
                fontSize: hp(14),
                height: hp(46),
                width: '100%',
                paddingLeft: hp(16),
                marginTop: hp(4),
            },
            wrongTextContainer: {
                height: bottomError ? hp(twoLinesError ? 48 : 24) : undefined,
            },
            titleWrong: {
                ...TEXT_STYLE.regular,
                color: STATUS_COLORS.error,
                marginTop: hp(5),
                fontSize: hp(12)
            },
            btnRight: {
                paddingRight: hp(20),
                width: '10%',
                alignItems: 'center',
            },
        });
    }, [hp, wp, appTheme]);

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={setValue}
                    style={[styles.input, (secureTextEntry || pasteButton) && { width: "90%" }, { paddingRight: pasteButton || secureTextEntry ? 0 : 16 }]}
                    value={value}
                    onChange={onChange}
                    placeholderTextColor={appTheme.primary}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry ? isSecure : false}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                />
                {(pasteButton || secureTextEntry) && (
                    <TouchableOpacity
                        onPress={() => setSecure(!isSecure)}
                        style={styles.btnRight}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <AnyIcon
                            type={IconType.MaterialCommunityIcons}
                            name={secureTextEntry ? (isSecure ? "eye-off-outline" : "eye-outline") : 'content-paste'}
                            size={hp(18)}
                            color={appTheme.primary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.wrongTextContainer}>
                {textWrong && <Text style={styles.titleWrong}>{textWrong}</Text>}
            </View>
        </View>
    )
}
import React, { useContext, useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { FONT_SIZE, SCREENS } from '../enums';
import { AnyIcon, IconType } from './AnyIcon';
import { AppDataContext } from '../context';
import { useResponsiveDimensions } from '../hooks';

const SIZE = 41;

export const AddButton = ({ navigation }: any) => {
    const { appTheme } = useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const toggleView = () => {
        navigation.navigate(SCREENS.ADD_SCREEN);
    };

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            },
            button: {
                alignItems: 'center',
                justifyContent: 'center',
                width: SIZE,
                height: SIZE,
                borderRadius: SIZE / 2,
                backgroundColor: appTheme.primary
            },
        })
    }, [hp, wp])

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={toggleView}>
                    <View style={styles.button}>
                        <AnyIcon
                            type={IconType.Ionicons}
                            name="add"
                            color={appTheme.primaryBackground}
                            size={hp(FONT_SIZE.h2)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const SubAddButton = ({ style, icon, onPress }: any) => {
    const { appTheme } = useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const styles = useMemo(() => {
        return StyleSheet.create({
            subButton: {
                position: 'absolute',
                width: SIZE / 2,
                height: SIZE / 2,
            },
            subButtonInner: {
                alignItems: 'center',
                justifyContent: 'center',
                width: SIZE / 2,
                height: SIZE / 2,
                borderRadius: SIZE / 4,
            },
            icon: {
                padding: hp(10),
            },
        })
    }, [hp, wp])
    return (
        <View style={[styles.subButton, style]}>
            <TouchableOpacity onPress={onPress} style={styles.subButtonInner}>
                <AnyIcon
                    type={IconType.Ionicons}
                    name="add"
                    color={appTheme.primaryBackground}
                    size={hp(FONT_SIZE.h2)}
                />
            </TouchableOpacity>
        </View>
    );
}


SubAddButton.propTypes = {
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func
};
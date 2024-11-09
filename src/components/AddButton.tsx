import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { OTHER_COLORS, SCREENS } from '../enums';
import { AnyIcon, IconType } from './AnyIcon';

const SIZE = 41;

export const AddButton = ({ navigation } : any) => {
    const toggleView = () => {
        navigation.navigate(SCREENS.ADD_SCREEN);
    };

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={toggleView}>
                    <View style={styles.button}>
                    <AnyIcon 
            type={IconType.Ionicons}
            name="add"
            color={OTHER_COLORS.white}
            size={18}
            />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const SubAddButton = ({ style, icon, onPress } : any) => (
    <View style={[styles.subButton, style]}>
        <TouchableOpacity onPress={onPress} style={styles.subButtonInner}>
            <AnyIcon 
            type={IconType.Ionicons}
            name="add"
            color={OTHER_COLORS.white}
            size={18}
            />
        </TouchableOpacity>
    </View>
);

SubAddButton.propTypes = {
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 15,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: OTHER_COLORS.primary
    },
    icon: {
        padding: 10,
    },
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
        backgroundColor: '#42A045',
    },
});
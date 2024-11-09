import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useMemo} from 'react';
import {FONT, FONT_SIZE, OTHER_COLORS} from '../enums';
import {useResponsiveDimensions} from '../hooks';

export const UserInput = ({label} : any) => {
  const {hp, wp} = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      label: {
        fontSize: FONT_SIZE.h3,
        fontWeight: 'regular',
        fontFamily: FONT.PoppinsRegular,
        textTransform: 'capitalize',
        color: OTHER_COLORS.primaryBlack,
      },
      input: {
        height: hp(48),
        borderRadius: hp(8),
        borderWidth: 0.5,
        borderColor: OTHER_COLORS.border,
        paddingLeft: hp(20),
      },
      inputContainer: {
        marginTop: hp(20),
      },
    });
  }, [OTHER_COLORS, hp, wp, FONT, FONT_SIZE]);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Text your ${label}`}
        placeholderTextColor={OTHER_COLORS.secondaryText}
      />
    </View>
  );
};

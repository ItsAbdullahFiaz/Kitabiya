import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';

export const Description = ({ description, handleDescription }: any) => {
  const { appTheme,appLang } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();

  const styles = useMemo(() => {
    return StyleSheet.create({
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      title: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
        fontFamily: FONT.PoppinsBold,
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
        marginRight: hp(5),
      },
      conditionContainer: {
        marginTop: hp(15),
      },
      input: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        paddingHorizontal: hp(15),
        height: hp(150),
        borderWidth: 0.5,
        borderColor: appTheme.borderDefault,
        paddingTop: hp(10),
        borderRadius: hp(8),
        textAlignVertical: 'top', // Ensures text starts at the top
      },
    });
  }, [hp, wp]);

  return (
    <View style={styles.conditionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{appLang.description}</Text>
        <AnyIcon
          type={IconType.FontAwesome5}
          name="star-of-life"
          size={8}
          color={OTHER_COLORS.red}
        />
      </View>
      <TextInput
        multiline
        value={description}
        numberOfLines={4}
        style={styles.input}
        placeholder="Describe the item you are selling"
        placeholderTextColor={appTheme.primaryTextColor}
        onChangeText={val => handleDescription(val)}
      />
    </View>
  );
};

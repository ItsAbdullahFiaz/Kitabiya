import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';
import { AppDataContext } from '../../../../context';

export const AdTitle = ({ bookTitle, handleSelectTitle }: any) => {
  const { appTheme,appLang } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      titleContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
      },
      title: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: "capitalize",
        marginRight: hp(5)
      },
      conditionContainer: {
        marginTop: hp(15)
      },
      input: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        paddingHorizontal: hp(15),
        height: hp(50),
        borderWidth: 0.5,
        borderColor: appTheme.borderDefault,
        paddingTop: hp(10),
        borderRadius: hp(8)
      },label: {
                    ...TEXT_STYLE.regular,
                    fontSize: hp(FONT_SIZE.h3),
                    color:appTheme.primaryTextColor,
                    textTransform: 'capitalize',
                  },
    })
  }, [hp, wp])

  return (
    <View style={styles.conditionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>{appLang.adTitle}</Text>
       
      </View>
      <TextInput style={styles.input} value={bookTitle} placeholder='Enter title' placeholderTextColor={appTheme.primaryTextColor}
        onChangeText={val => handleSelectTitle(val)} />
    </View>
  )
}

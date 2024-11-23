import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';

export const Condition = ({ handleSelect, selected }: any) => {
  const { appTheme } = useContext(AppDataContext);
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
      container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      button: {
        marginTop: hp(10),
        paddingVertical: hp(10),
        paddingHorizontal: hp(20),
        borderRadius: hp(20),
        borderWidth: 0.5,
        borderColor: appTheme.primary,
        marginRight: hp(10)
      },
      text: {
        ...TEXT_STYLE.medium,
        color: appTheme.primary,
        fontSize: hp(FONT_SIZE.h3),
      },
      selectedButton: {
        backgroundColor: appTheme.primary,
      },
      selectedText: {
        color: appTheme.primaryBackground,
      },
    })
  }, [hp, wp])

  return (
    <View style={styles.conditionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>condition</Text>
        <AnyIcon
          type={IconType.FontAwesome5}
          name='star-of-life'
          size={8}
          color={OTHER_COLORS.red}
        />
      </View>
      {/* start */}
      <View style={styles.container}>
        {/* NEW Button */}
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'NEW' && styles.selectedButton,
          ]}
          onPress={() => handleSelect('NEW')}
        >
          <Text
            style={[
              styles.text,
              selected === 'NEW' && styles.selectedText,
            ]}
          >
            NEW
          </Text>
        </TouchableOpacity>

        {/* USED Button */}
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'USED' && styles.selectedButton,
          ]}
          onPress={() => handleSelect('USED')}
        >
          <Text
            style={[
              styles.text,
              selected === 'USED' && styles.selectedText,
            ]}
          >
            USED
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

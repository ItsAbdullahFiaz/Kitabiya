import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, TEXT_STYLE } from '../../../../enums';

export const Condition = ({ handleSelect, selected }: any) => {
  const { appTheme, appLang } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();

  const styles = useMemo(() => {
    return StyleSheet.create({
      title: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: "capitalize",
        marginBottom: hp(3)
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
        paddingVertical: hp(5),
        paddingHorizontal: hp(18),
        borderRadius: hp(15),
        borderWidth: 0.5,
        borderColor: appTheme.primary,
        marginRight: hp(15)
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
      <Text style={styles.title}>{appLang.condition}</Text>
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
            {appLang.new}
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
            {appLang.used}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

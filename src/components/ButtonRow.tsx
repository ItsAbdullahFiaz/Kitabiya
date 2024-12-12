import React, { useContext, useMemo } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { AppDataContext } from '../context';
import { useResponsiveDimensions } from '../hooks';
import { FONT } from '../enums';

interface ButtonRowProps {
  icon?: React.ReactNode;
  title?: string;
  contentRight?: React.ReactNode;
  contentRightStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  index?: number,
  bgStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  hideBorder?: boolean
}

export const ButtonRow = (props: ButtonRowProps) => {
  const { icon, title, contentRight, contentRightStyle, onPress, index, bgStyle, titleStyle, hideBorder } = props;
  const { appTheme, appLang, langTranslations } = useContext(AppDataContext);
  const lalangTranslationsLength = langTranslations.length - 1
  const { wp, hp } = useResponsiveDimensions();

  const styles = useMemo(() => {
    return StyleSheet.create({
      wrapRow: {
        // backgroundColor: 'red',
        borderBottomWidth: lalangTranslationsLength == index || hideBorder ? 0 : hp(0.3),
        borderBottomColor: appLang.primary,
        // borderRadius: hp(4),
        height: hp(64),
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingRight: hp(16),
        paddingLeft: hp(20),
      },
      wrapContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      titleRow: {
        fontFamily: FONT.PoppinsMedium,
        fontSize: hp(15),
        color: appTheme.primaryTextColor,
      },
      contentRight: {
        paddingRight: hp(16)
      }
    });
  }, [wp, hp, appTheme, appLang]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.wrapRow, bgStyle]}>
      <View style={[styles.contentRight, contentRightStyle]}>
        {contentRight}
      </View>
      <View>
        {icon}
        <Text numberOfLines={1} style={[styles.titleRow, titleStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

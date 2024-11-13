import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { FONT_SIZE, TEXT_STYLE } from '../../enums'
import { AppDataContext } from '../../context'
import { useResponsiveDimensions } from '../../hooks'

export const Instructions = ({ children, textAlign }: any) => {
  const {appTheme}=useContext(AppDataContext);
  const {hp,wp}=useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        fontWeight: "regular",
        color: appTheme.tertiaryTextColor,
        textAlign: textAlign
      }
    })
  }, [hp,wp])
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}
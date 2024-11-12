import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../enums'

export const Instructions = ({ children, textAlign }: any) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsRegular,
        fontWeight: "regular",
        color: OTHER_COLORS.secondaryText,
        textAlign: textAlign
      }
    })
  }, [FONT, FONT_SIZE, OTHER_COLORS])
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { FONT, FONT_SIZE, OTHER_COLORS, SCREENS } from '../enums'
import { useResponsiveDimensions } from '../hooks'
import { useNavigation } from '@react-navigation/native'

export const BookHeader = () => {
    const navigation=useNavigation();
    const {hp,wp}=useResponsiveDimensions();
  const [selectedTab, setSelectedTab] = useState('Book');
    const styles = useMemo(()=>{
        return StyleSheet.create({
            container: {
                flexDirection: 'row',
            backgroundColor: OTHER_COLORS.backButtonBackground,
            borderRadius: hp(20),
            padding: hp(4),
        },
          tabButton: {
              flex: 1,
              paddingVertical: hp(10),
            alignItems: 'center',
            borderRadius: hp(15),
          },
          activeTab: {
            backgroundColor: OTHER_COLORS.primary,
        },
        tabText: {
            color: OTHER_COLORS.secondaryText,
            fontWeight: 'bold',
        },
        activeTabText: {
            color:OTHER_COLORS.white,
        },
    })
},[hp,wp,FONT,FONT_SIZE,OTHER_COLORS])
    return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'Book' && styles.activeTab]}
        onPress={() => setSelectedTab('Book')}
      >
        <Text style={[styles.tabText, selectedTab === 'Book' && styles.activeTabText]}>Book</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'Audio' && styles.activeTab]}
        onPress={() => navigation.navigate(SCREENS.AUDIO as never)}
      >
        <Text style={[styles.tabText, selectedTab === 'Audio' && styles.activeTabText]}>Audio</Text>
      </TouchableOpacity>
    </View>
  )
}
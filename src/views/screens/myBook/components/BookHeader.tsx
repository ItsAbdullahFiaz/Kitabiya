import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { SCREENS } from '../../../../enums'
import { useResponsiveDimensions } from '../../../../hooks'
import { useNavigation } from '@react-navigation/native'
import { AppDataContext } from '../../../../context'

export const BookHeader = () => {
  const {appTheme}=useContext(AppDataContext);
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const [selectedTab, setSelectedTab] = useState('Book');
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        backgroundColor: appTheme.secondaryBackground,
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
        backgroundColor: appTheme.primary,
      },
      tabText: {
        color: appTheme.tertiaryTextColor,
        fontWeight: 'bold',
      },
      activeTabText: {
        color: appTheme.primaryBackground,
      },
    })
  }, [hp, wp])
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
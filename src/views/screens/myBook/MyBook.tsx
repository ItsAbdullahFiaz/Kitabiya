import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {AnyIcon, Category, IconType, MainContainer} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
import {FONT, FONT_SIZE, OTHER_COLORS, SCREENS} from '../../../enums';
import {useNavigation} from '@react-navigation/native';
import {BookHeader} from '../../../components/BookHeader';
import {topTrending} from '../../../utils';
import ContinueReading from '../../../components/ContinueReading';

export const MyBook = () => {
  const navigation = useNavigation();
  const {hp, wp} = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: OTHER_COLORS.white,
      },
      searchContainer: {
        marginTop: hp(20),
        height: hp(40),
        width: '100%',
        borderRadius: hp(12),
        backgroundColor: OTHER_COLORS.backButtonBackground,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: hp(10),
      },
      input: {
        height: '100%',
        marginTop: hp(5),
        paddingTop: hp(5),
      },
    });
  }, [hp, wp, FONT, FONT_SIZE, OTHER_COLORS]);

  return (
    <View style={styles.mainContainer}>
            <StatusBar barStyle={"dark-content"} backgroundColor={OTHER_COLORS.white}/>
      <View style={{padding: hp(16)}}>
        <BookHeader />
        <View style={styles.searchContainer}>
          <AnyIcon
            type={IconType.EvilIcons}
            name="search"
            color={OTHER_COLORS.border}
            size={16}
          />
          <TextInput
            style={styles.input}
            placeholder="Search here"
            placeholderTextColor={OTHER_COLORS.border}
          />
        </View>
      </View>
      <ContinueReading />
      <View style={{padding:hp(16)}}>
        <Category/>
      </View>
    </View>
  );
};

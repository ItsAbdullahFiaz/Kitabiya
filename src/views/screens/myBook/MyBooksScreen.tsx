import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useMemo } from 'react';
import { AnyIcon, IconType } from '../../../components';
import { useResponsiveDimensions } from '../../../hooks';
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../enums';
import { useNavigation } from '@react-navigation/native';
import { BookHeader, Category, ContinueReading } from './components';
import { AppDataContext } from '../../../context';

export const MyBooksScreen = () => {
  const {appTheme,appLang}=useContext(AppDataContext);
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: appTheme.primaryBackground,
      },
      searchContainer: {
        marginTop: hp(20),
        height: hp(40),
        width: '100%',
        borderRadius: hp(12),
        backgroundColor: appTheme.secondaryBackground,
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
  }, [hp, wp]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={"dark-content"} backgroundColor={appTheme.primaryBackground} />
      <View style={{ padding: hp(16) }}>
        <BookHeader />
        <View style={styles.searchContainer}>
          <AnyIcon
            type={IconType.EvilIcons}
            name="search"
            color={appTheme.inputBorder}
            size={16}
          />
          <TextInput
            style={styles.input}
            placeholder={appLang.Searchhere}
            placeholderTextColor={appTheme.inputBorder}
          />
        </View>
      </View>
      <ContinueReading />
      <View style={{ padding: hp(16) }}>
        <Category />
      </View>
    </View>
  );
};

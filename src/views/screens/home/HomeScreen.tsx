import React, {useContext, useEffect, useMemo, useState} from 'react';
import {AnyIcon, IconType, MainContainer} from '../../../components';
import {AppDataContext} from '../../../context';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SectionList,
  RefreshControl,
} from 'react-native';
import {FONT, FONT_SIZE, SCREENS} from '../../../enums';
import {useResponsiveDimensions} from '../../../hooks';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtons, PopularProducts, NewlyAdded} from './components';
import {notificationService} from '../../../services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import useUserPresence from '../../../hooks/useUserPresence';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {appTheme, appLang} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // useUserPresence();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const permissionGranted =
          await notificationService.requestUserPermission();
        if (permissionGranted) {
          const emailId = await AsyncStorage.getItem('EMAIL');
          if (emailId) {
            await notificationService.saveFCMToken(emailId);
          }
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await Promise.all([fetchPopularFunc()]);
  //   setRefreshing(false);
  // };
  const getName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('NAME');
      if (storedName !== null) {
        setUserName(storedName);
      }
    } catch (error) {
      console.error('Error retrieving name from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getName();
  }, []);
  const renderHeader = () => (
    <View style={styles.homeHeader}>
      <View style={styles.headerContainer}>
        <Text style={styles.userName}>{`Hello, ${userName}`}</Text>
        <View style={styles.iconContainer}>
          <View style={styles.cartIconContainer}></View>
          <HeaderButtons
            onPress={() => navigation.navigate(SCREENS.NOTIFICATION as never)}>
            <AnyIcon
              type={IconType.SimpleLineIcons}
              name="bell"
              color={appTheme.primaryTextColor}
              size={20}
            />
          </HeaderButtons>
        </View>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.searchContainer}
          onPress={() => navigation.navigate(SCREENS.SEARCH as never)}>
          <AnyIcon
            type={IconType.EvilIcons}
            name="search"
            color={appTheme.tertiaryTextColor}
            size={16}
          />
          <Text style={styles.searchHere}>{appLang.Searchhere}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const sections = useMemo(
    () => [
      {
        title: 'Popular',
        data: [popularProducts],
        renderItem: () => (
          <View style={styles.popularProductsContainer}>
            <PopularProducts />
          </View>
        ),
        showSeeMore: true,
      },
      {
        title: 'Newly Added',
        data: [newlyAddedProducts],
        renderItem: () => (
          <View style={styles.newlyAddedContainer}>
            <NewlyAdded />
          </View>
        ),
        showSeeMore: false,
      },
    ],
    [popularProducts, newlyAddedProducts],
  );

  const renderSectionHeader = ({section}: {section: any}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.heading}>{section.title}</Text>
      {section.showSeeMore && (
        <TouchableOpacity>
          <Text>{appLang.Seemore}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      skeletonContainer: {
        paddingHorizontal: hp(16),
        marginVertical: hp(10),
      },
      homeHeader: {
        height: hp(162),
        backgroundColor: appTheme.primary,
        padding: hp(16),
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      userName: {
        fontSize: FONT_SIZE.h1,
        fontFamily: FONT.PoppinsMedium,
        color: appTheme.primaryBackground,
        textTransform: 'capitalize',
      },
      iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      cartIconContainer: {
        marginRight: hp(12),
      },
      searchContainer: {
        height: hp(50),
        backgroundColor: appTheme.primaryBackground,
        marginTop: hp(35),
        borderRadius: hp(12),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: hp(10),
      },
      newlyAddedContainer: {
        paddingHorizontal: hp(16),
      },
      popularProductsContainer: {
        paddingHorizontal: hp(16),
        marginTop: hp(20),
      },
      heading: {
        fontSize: FONT_SIZE.h3,
        fontFamily: FONT.PoppinsBold,
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      sectionHeader: {
        paddingHorizontal: hp(16),
        marginTop: hp(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      searchHere: {
        fontSize: FONT_SIZE.h5,
        fontFamily: FONT.PoppinsRegular,
        color: appTheme.tertiaryTextColor,
        marginLeft: hp(10),
      },
    });
  }, [hp, wp]);

  return (
    <MainContainer fullWidth>
      <StatusBar
        backgroundColor={appTheme.primary}
        barStyle={'light-content'}
      />
      <SectionList
        sections={sections}
        renderItem={({section}) => section.renderItem()}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderHeader}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            // onRefresh={onRefresh}
            colors={[appTheme.primary]} // Android
            tintColor={appTheme.primary} // iOS
          />
        }
      />
    </MainContainer>
  );
};

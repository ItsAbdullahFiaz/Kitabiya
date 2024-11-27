import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  AnyIcon,
  IconType,
  MainContainer,
  SkeletonLoader,
} from '../../../components';
import {AppDataContext} from '../../../context';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {FONT, FONT_SIZE, SCREENS} from '../../../enums';
import {useResponsiveDimensions} from '../../../hooks';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtons, PopularProducts, NewlyAdded} from './components';
import {notificationService} from '../../../services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiService} from '../../../services/api';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {appTheme, appLang} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Request permission
        const permissionGranted =
          await notificationService.requestUserPermission();
        if (permissionGranted) {
          // Get userId from AsyncStorage
          const emailId = await AsyncStorage.getItem('EMAIL');
          if (emailId) {
            // Save FCM token
            await notificationService.saveFCMToken(emailId);
          }
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchPopularProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts();
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch products');
      }
      setNewlyAddedProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularProducts = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getPopularProducts();
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch popular products');
      }
      setPopularProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching popular products:', error);
    } finally {
      setIsLoading(false);
    }
  };
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
          <View style={styles.cartIconContainer}>
            <HeaderButtons
              onPress={() => navigation.navigate(SCREENS.FAVOURITES as never)}>
              <AnyIcon
                type={IconType.Ionicons}
                name="heart-outline"
                color={appTheme.primaryTextColor}
                size={20}
              />
            </HeaderButtons>
          </View>
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

  //commented
  // const renderNewlyAddedProducts = () => {
  //   if (loading) {
  //     // Render Skeletons
  //     return (
  //       <View style={styles.skeletonContainer}>
  //         {[...Array(4)].map((_, index) => (
  //           <SkeletonLoader
  //             key={index}
  //             width={'100%'}
  //             height={100}
  //             borderRadius={8}
  //           />
  //         ))}
  //       </View>
  //     );
  //   }
  //   // Render Actual Products
  //   return <NewlyAdded products={newlyAddedProducts} loading={loading} />;
  // };
  // const renderPopularProducts = () => {
  //   if (loading) {
  //     // Render Skeletons
  //     return (
  //       <View style={styles.skeletonContainer}>
  //         {[...Array(4)].map((_, index) => (
  //           <SkeletonLoader
  //             key={index}
  //             width={'100%'}
  //             height={150}
  //             borderRadius={8}
  //           />
  //         ))}
  //       </View>
  //     );
  //   }
  //   // Render Actual Products
  //   return <PopularProducts products={popularProducts} />;
  // };

  // const sections = useMemo(
  //   () => [
  //     {
  //       title: 'Popular',
  //       data: [popularProducts],
  //       renderItem: renderPopularProducts,
  //       showSeeMore: true,
  //     },
  //     {
  //       title: 'Newly Added',
  //       data: [newlyAddedProducts],
  //       renderItem: renderNewlyAddedProducts,
  //       showSeeMore: false,
  //     },
  //   ],
  //   [popularProducts, newlyAddedProducts, loading],
  // );

  const sections = useMemo(
    () => [
      {
        title: 'Popular',
        data: [popularProducts],
        renderItem: () => (
          <View style={styles.popularProductsContainer}>
            <PopularProducts products={popularProducts} loading={isloading} />
          </View>
        ),
        showSeeMore: true,
      },
      {
        title: 'Newly Added',
        data: [newlyAddedProducts],
        renderItem: () => (
          <View style={styles.newlyAddedContainer}>
            <NewlyAdded products={newlyAddedProducts} loading={loading} />
          </View>
        ),
        showSeeMore: false,
      },
    ],
    [popularProducts, newlyAddedProducts, loading],
  );

  const renderSectionHeader = ({section}: {section: any}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.heading}>{section.title}</Text>
      {section.showSeeMore && (
        <TouchableOpacity onPress={fetchPopularProducts}>
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
      />
    </MainContainer>
  );
};

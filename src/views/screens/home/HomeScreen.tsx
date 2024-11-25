import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AnyIcon, IconType } from '../../../components';
import { AppDataContext } from '../../../context';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { FONT, FONT_SIZE, SCREENS } from '../../../enums';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { HeaderButtons, NewlyPublished, TopTrending } from './components';
import { notificationService } from '../../../services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../../../services/api';

export const HomeScreen = () => {
    const navigation = useNavigation();
    const { appTheme, appLang } = useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setupNotifications = async () => {
            try {
                // Request permission
                const permissionGranted = await notificationService.requestUserPermission();
                if (permissionGranted) {
                    // Get userId from AsyncStorage
                    const userId = await AsyncStorage.getItem('USERID');
                    if (userId) {
                        // Save FCM token
                        await notificationService.saveFCMToken(userId);
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
            const response = await apiService.getPopularProducts();

            if (response.error) {
                throw new Error(response.message || 'Failed to fetch popular products');
            }

            setPopularProducts(response.data || []);
            console.log('popularProducts', response.data);
        } catch (error) {
            console.error('Error fetching popular products:', error);
        }
    };

    const renderNewlyPublished = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={appTheme.primary} />
                </View>
            );
        }

        return <NewlyPublished products={popularProducts} />;
    };

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: appTheme.primaryBackground
            },
            homeHeader: {
                height: hp(162),
                backgroundColor: appTheme.primary,
                padding: hp(16)
            },
            headerContainer: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            },
            userName: {
                fontSize: FONT_SIZE.h1,
                fontFamily: FONT.PoppinsMedium,
                color: appTheme.primaryBackground,
                textTransform: "capitalize"
            },
            iconContainer: {
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
            },
            cartIconContainer: {
                marginRight: hp(12)
            },
            searchContainer: {
                height: hp(50),
                backgroundColor: appTheme.primaryBackground,
                marginTop: hp(35),
                borderRadius: hp(12),
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingHorizontal: hp(10)
            },
            topTrendingContainer: {
                paddingHorizontal: hp(16),
                marginTop: hp(20),
                // height: hp(342),
                overflow: "hidden"
            },
            heading: {
                fontSize: FONT_SIZE.h3,
                fontFamily: FONT.PoppinsBold,
                color: appTheme.primaryTextColor,
                textTransform: "capitalize"
            },
            NewlyPublishedHeader: {
                paddingHorizontal: hp(16),
                marginTop: hp(20),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            },
            searchHere: {
                fontSize: FONT_SIZE.h5,
                fontFamily: FONT.PoppinsRegular,
                color: appTheme.tertiaryTextColor,
                marginLeft: hp(10)
            },
            loadingContainer: {
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }
        })
    }, [hp, wp])
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={appTheme.primary} barStyle={"light-content"} />
            <View style={styles.homeHeader}>
                <View style={styles.headerContainer}>
                    <Text style={styles.userName}>{appLang.helloemmie}</Text>
                    <View style={styles.iconContainer}>
                        <View style={styles.cartIconContainer}>
                            <HeaderButtons onPress={() => navigation.navigate(SCREENS.FAVOURITES as never)}>
                                <AnyIcon
                                    type={IconType.Ionicons}
                                    name="heart-outline"
                                    color={appTheme.primaryTextColor}
                                    size={20}
                                />
                            </HeaderButtons>
                        </View>
                        <HeaderButtons onPress={() => navigation.navigate(SCREENS.NOTIFICATION as never)} >
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
                    <TouchableOpacity activeOpacity={0.9} style={styles.searchContainer} onPress={() => navigation.navigate(SCREENS.SEARCH as never)}>
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
            <ScrollView>
                <View style={styles.NewlyPublishedHeader}>
                    <Text style={styles.heading}>{'Popular'}</Text>
                    <TouchableOpacity onPress={fetchPopularProducts}>
                        <Text>{appLang.Seemore}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingLeft: 16, marginTop: 10 }}>
                    {renderNewlyPublished()}
                </View>
                <View style={styles.topTrendingContainer}>
                    <Text style={styles.heading}>{'Top Trending'}</Text>
                    <TopTrending products={newlyAddedProducts} loading={loading} />
                </View>
            </ScrollView>
        </View>
    );
};
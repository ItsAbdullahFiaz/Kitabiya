import React, { useContext, useEffect, useMemo } from 'react';
import { AnyIcon, IconType } from '../../../components';
import { AppDataContext } from '../../../context';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { FONT, FONT_SIZE, SCREENS } from '../../../enums';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { HeaderButtons, NewlyPublished, TopTrending } from './components';
import { notificationService } from '../../../services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = () => {
    const navigation = useNavigation();
    const { appTheme,appLang } = useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();

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
                height: hp(342),
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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            },
            searchHere: {
                fontSize: FONT_SIZE.h5,
                fontFamily: FONT.PoppinsRegular,
                color: appTheme.inputBorder,
                marginLeft: hp(10)
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
                            color={appTheme.inputBorder}
                            size={16}
                        />
                        {/* <TextInput style={{height:"100%"}} placeholder='Search here' placeholderTextColor={OTHER_COLORS.border}/> */}
                        <Text style={styles.searchHere}>{appLang.Searchhere}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.topTrendingContainer}>
                <Text style={styles.heading}>{appLang.Foryou}</Text>
                <TopTrending />
            </View>
            <View style={styles.NewlyPublishedHeader}>
                <Text style={styles.heading}>{appLang.NewlyAdded}</Text>
                <TouchableOpacity>
                    <Text>{appLang.Seemore}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 16, marginTop: 10 }}>
                <NewlyPublished />
            </View>
        </View>
    );
};
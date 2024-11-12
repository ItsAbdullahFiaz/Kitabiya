import React, { useContext, useMemo } from 'react';
import { AnyIcon, AppIcon, CustomInput, Header, HeaderButtons, IconType, NewlyPublished, TopTrending } from '../../../components';
import { AppDataContext } from '../../../context';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { FONT, FONT_SIZE,  SCREENS } from '../../../enums';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
    const navigation = useNavigation();
    const {appTheme}=useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: appTheme.background
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
                color: appTheme.background,
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
                backgroundColor: appTheme.background,
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
                color: appTheme.black,
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
    }, [ hp, wp])
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={appTheme.primary} barStyle={"light-content"} />
            <View style={styles.homeHeader}>
                <View style={styles.headerContainer}>
                    <Text style={styles.userName}>hello, emmie</Text>
                    <View style={styles.iconContainer}>
                        <View style={styles.cartIconContainer}>
                            <HeaderButtons onPress={() => navigation.navigate(SCREENS.FAVOURITES as never)}>
                                <AnyIcon
                                    type={IconType.Ionicons}
                                    name="heart-outline"
                                    color={appTheme.black}
                                    size={20}
                                />
                            </HeaderButtons>
                        </View>
                        <HeaderButtons>
                            <AnyIcon
                                type={IconType.SimpleLineIcons}
                                name="bell"
                                color={appTheme.black}
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
                        <Text style={styles.searchHere}>Search here</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.topTrendingContainer}>
                <Text style={styles.heading}>top trending</Text>
                <TopTrending />
            </View>
            <View style={styles.NewlyPublishedHeader}>
                <Text style={styles.heading}>newly published</Text>
                <TouchableOpacity>
                    <Text>See more</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 16, marginTop: 10 }}>
                <NewlyPublished />
            </View>
        </View>
    );
};
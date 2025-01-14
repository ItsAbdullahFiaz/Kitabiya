import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { AnyIcon, Header, IconType, MainButton, MainContainer } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { AppDataContext } from '../../../context'
import UserAvatar from 'react-native-user-avatar';
import { getColorByFirstLetter } from '../../../utils'
import { FONT_SIZE, SCREENS, TEXT_STYLE } from '../../../enums'
import { useNavigation } from '@react-navigation/native'

export const UserDetails = ({ route }) => {
    const navigation = useNavigation<any>();
    console.log("USERDETALS===>", route.params.userDetails);
    const { userDetails } = route.params;
    const { hp, wp } = useResponsiveDimensions();
    const { appTheme, appLang } = useContext(AppDataContext);
    const styles = useMemo(() => {
        return StyleSheet.create({
            mainContainer: {
                padding: hp(16),
                backgroundColor: "#fff"
            },
            imgContainer: {
                width: "100%",
                height: "40%",
            },
            bottomContainer: {
                width: "100%",
                height: "55%",
                backgroundColor: "#fff",
                position: "absolute",
                bottom: 0,
                borderTopRightRadius: hp(30),
                borderTopLeftRadius: hp(30),
            },
            img: {
                height: "100%",
                width: "100%",
                borderRadius: 0
            },
            userName: {
                ...TEXT_STYLE.bold,
                fontSize: hp(FONT_SIZE.h1),
                color: appTheme.primaryTextColor,
                textAlign: "center",
                marginTop: hp(30)
            },
            userEmail: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h3),
                color: appTheme.primaryTextColor,
                textAlign: "center",
                marginTop: hp(10)
            },
            locationContainer: {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: hp(15)
            },
            address: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h1),
                color: appTheme.primary,
                marginLeft: hp(10)
            },
            chatBtnContainer: {
                position: 'absolute',
                bottom: hp(30),
                width: '100%',
                alignSelf: 'center',
                paddingHorizontal: hp(16),
            },
        })
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <Header title='user details' />
            </View>
            <View style={styles.imgContainer}>
                <UserAvatar
                    style={styles.img}
                    size={200}
                    name={userDetails.userName}
                    bgColor={getColorByFirstLetter(userDetails.userName)}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.userName}>{userDetails.userName}</Text>
                <Text style={styles.userEmail}>{userDetails.email}</Text>
                <View style={styles.locationContainer}>
                    <AnyIcon
                        type={IconType.Entypo}
                        name='location-pin'
                        color={appTheme.primary}
                        size={20} />
                    <Text style={styles.address}>Zahir Pir</Text>
                </View>
                <View style={styles.chatBtnContainer}>
                    <MainButton
                        onPress={() =>
                            navigation.goBack()
                        }
                        buttonText="Message Now"
                    />
                </View>
            </View>
        </View>
    )
}
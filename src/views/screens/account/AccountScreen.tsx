import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { AnyIcon, IconType, MainContainer, ProfileHeader } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../enums'
import { signOutUser } from '../../../services'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

export const AccountScreen = () => {
  // const [fullName,setFullName]=useState("");
  // const [userEmail,setUserEmail]=useState("");
  // const [userImage,setUserImage]=useState("");
  const [userInfo,setUserInfo]=useState<any>("");
  const { hp, wp } = useResponsiveDimensions();
  const navigation = useNavigation();
  const userDetails=async()=>{
    try {
        const user=await auth().currentUser;
        setUserInfo(user);
        console.log("CURRENT_USER===>",user);
    } catch (error) {
        console.log(error.message)
    }
}
useEffect(()=>{
    userDetails();
},[])
  const styles = useMemo(() => {
    return StyleSheet.create({
      buttonsContainer: {
        marginTop: hp(50)
      },
      btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
      },
      btnText: {
        marginLeft: hp(20),
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.primaryBlack
      },
      border: {
        borderWidth: 0.2,
        borderColor: OTHER_COLORS.secondaryText,
        marginVertical: hp(20)
      },
      secondBtnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      logoutContainer: {
        marginTop: hp(40),
        height: hp(48),
        width: "100%",
        borderRadius: hp(16),
        borderWidth: 0.5,
        borderColor: OTHER_COLORS.primary,
        justifyContent: "center",
        alignItems: "center"
      },
      logoutText: {
        fontSize: FONT_SIZE.h3,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.primary,
        textTransform: "capitalize"
      }
    })
  }, [hp, wp, FONT, FONT_SIZE, OTHER_COLORS])
  return (
    <MainContainer>
      <ProfileHeader userInfo={userInfo}/>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.Octicons}
            name='person'
            size={24}
            color={OTHER_COLORS.primary}
          />
          <Text style={styles.btnText}>Profile</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.secondBtnContainer}>
          <View style={styles.btnContainer}>
            <AnyIcon
              type={IconType.Fontisto}
              name='world-o'
              size={20}
              color={OTHER_COLORS.primary}
            />
            <Text style={styles.btnText}>Language</Text>
          </View>
          <Text>Enflish (US)</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.MaterialIcons}
            name='lock-outline'
            size={20}
            color={OTHER_COLORS.primary}
          />
          <Text style={styles.btnText}>Privacy Policy</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.MaterialIcons}
            name='info-outline'
            size={20}
            color={OTHER_COLORS.primary}
          />
          <Text style={styles.btnText}>Help Center</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.Ionicons}
            name='settings-outline'
            size={20}
            color={OTHER_COLORS.primary}
          />
          <Text style={styles.btnText}>Setting</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => signOutUser(navigation)} style={styles.logoutContainer}>
        <Text style={styles.logoutText}>log out</Text>
      </TouchableOpacity>
    </MainContainer>
  )
}
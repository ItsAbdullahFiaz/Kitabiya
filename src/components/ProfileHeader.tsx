import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../enums';
import { useResponsiveDimensions } from '../hooks';

export const ProfileHeader = ({userInfo} : any) => {
    const {hp,wp}=useResponsiveDimensions();
  const styles =useMemo(()=>{
    return StyleSheet.create({
      profileHeader:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        marginTop:hp(20)
      },
      imgContainer:{
        height:hp(88),
        width:hp(88),
        borderRadius:hp(44),
        backgroundColor:OTHER_COLORS.imagePlaceholderColor,
        overflow:"hidden"
      },
      img:{
        width:"100%",
        height:"100%",
        objectFit:"cover"
      },
      name:{
        marginTop:hp(5),
        fontSize:FONT_SIZE.h3,
        fontFamily:FONT.PoppinsMedium,
        color:OTHER_COLORS.primaryBlack,
        textTransform:"capitalize"
      },
      gmail:{
        fontSize:FONT_SIZE.h4,
        fontFamily:FONT.PoppinsRegular,
        color:OTHER_COLORS.secondaryText
      }
    })
  },[hp,wp,FONT,FONT_SIZE,OTHER_COLORS])
  return (
    <>
    {userInfo ? (
      <View style={styles.profileHeader}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{uri:userInfo.photoURL}}/>
      </View>
      <Text style={styles.name}>{userInfo.displayName}</Text>
      <Text style={styles.gmail}>{userInfo.email}</Text>
    </View>
    ):(
      <ActivityIndicator/>
    )}
      </>
  )
}

const styles = StyleSheet.create({})
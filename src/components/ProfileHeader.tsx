import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../enums';
import { useResponsiveDimensions } from '../hooks';

export const ProfileHeader = () => {
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
    <View style={styles.profileHeader}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../assets/images/person.jpg")}/>
        </View>
        <Text style={styles.name}>emmie watson</Text>
        <Text style={styles.gmail}>emmie1709@gmail.com</Text>
      </View>
  )
}

const styles = StyleSheet.create({})
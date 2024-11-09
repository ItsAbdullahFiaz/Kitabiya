import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks'

export const SocialLogins = () => {
    const {hp,wp}=useResponsiveDimensions();
    const styles = useMemo(()=>{
        return StyleSheet.create({
            lineContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: hp(40),
          },
          line: {
            flex: 1,
            height: 0.5,
            backgroundColor: '#838383',
        },
        text: {
            marginHorizontal: 10,
            color: '#838383',
            textTransform:"capitalize"
        },
        socialBtnContainer:{
            flexDirection:"row",
            height:hp(48),
            borderWidth:0.3,
            borderColor:"#838383",
            borderRadius:hp(8),
            justifyContent:"center",
            alignItems:"center",
        },
        btnIcon:{
            width:hp(24),
            height:hp(24),
            marginRight:hp(10)
        },
        socialBtnText:{
            fontSize:16,
            color:"#000",
            fontWeight:"bold",
            textTransform:"capitalize",
            fontFamily:"Poppins-Regular"
        }
    })
},[])
    return (
    <View>
      <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.text}>or</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity style={styles.socialBtnContainer}>
            <Image style={styles.btnIcon} source={require("../assets/images/google.png")}/>
            <Text style={styles.socialBtnText}>continue with google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtnContainer,{marginTop:20}]}>
            <Image style={styles.btnIcon} source={require("../assets/images/facebook.png")}/>
            <Text style={styles.socialBtnText}>continue with facebook</Text>
          </TouchableOpacity>
    </View>
  )
}
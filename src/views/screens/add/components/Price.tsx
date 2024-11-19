import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';

export const Price = ({handlePrice,price}:any) => {
    const {appTheme} = useContext(AppDataContext);
    const {hp,wp}=useResponsiveDimensions();
const styles = useMemo(()=>{
    return StyleSheet.create({
        titleContainer:{
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center"
          },
          title:{
            ...TEXT_STYLE.bold,
            fontSize:hp(FONT_SIZE.h3),
            color:appTheme.primaryTextColor,
            textTransform:"capitalize",
            marginRight:hp(5)
        },
        conditionContainer:{
            marginTop:hp(15)
          },
          inputContainer:{
            height:hp(50),
            borderWidth:0.5,
            borderColor:appTheme.grey,
            borderRadius:hp(8),
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center"
          },
          textContainer:{
            height:"100%",
            width:hp(50),
            justifyContent:"center",
            alignItems:"center",
            borderRightWidth:0.5,
            borderRightColor:appTheme.grey
          },
          text:{
            fontSize:hp(FONT_SIZE.h3),
            textTransform:"capitalize"
          },
          inputContainers:{
            width:"100%",
            height:"100%",
            justifyContent:"flex-start",
          },
          input:{
            ...TEXT_STYLE.regular,
            width:"100%",
            height:"100%",
            fontSize:hp(FONT_SIZE.h4),
            paddingHorizontal:hp(15)
          },
    })
},[hp,wp])

  return (
    <View style={styles.conditionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>price</Text>
        <AnyIcon 
        type={IconType.FontAwesome5}
        name='star-of-life'
        size={8}
        color={appTheme.compulsory}
        />
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>rs</Text>
            </View>
            <View style={styles.inputContainers}>
            <TextInput style={styles.input} keyboardType={"number-pad"} value={price} placeholder='Enter price' placeholderTextColor={appTheme.grey} onChangeText={val=>handlePrice(val)}/>
            </View>
        </View>
      </View>
  )
}

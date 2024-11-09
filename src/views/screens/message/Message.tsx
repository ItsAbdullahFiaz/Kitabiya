import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { AnyIcon, IconType, MainContainer } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../enums'


const data=[
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Anika",
    text:"Oh i don't like fist",
    numberOfMessages:2
  },
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Shreya",
    text:"Oh i don't like fist",
    numberOfMessages:3
  },
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Lilly",
    text:"Oh i don't like fist",
    numberOfMessages:0
  },
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Mona",
    text:"Oh i don't like fist",
    numberOfMessages:0
  },
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Sonia",
    text:"Oh i don't like fist",
    numberOfMessages:1
  },
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Monika",
    text:"Oh i don't like fist",
    numberOfMessages:0
  },
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Kiran",
    text:"Oh i don't like fist",
    numberOfMessages:5
  },
  {
    image:require("../../../assets/images/person.jpg"),
    name:"Roshni",
    text:"Oh i don't like fist",
    numberOfMessages:0
  },
]
export const Message = () => {
  const {hp,wp}=useResponsiveDimensions();
  const styles =useMemo(()=>{
    return  StyleSheet.create({
      title:{
        fontSize:FONT_SIZE.h1,
        fontFamily:FONT.PoppinsMedium,
        color:OTHER_COLORS.black,
        textAlign:"center",
        textTransform:"capitalize"
    },
    searchContainer: {
      marginTop: hp(20),
      height: hp(40),
      width: '100%',
      borderRadius: hp(12),
      backgroundColor: OTHER_COLORS.backButtonBackground,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: hp(10),
    },
    input: {
      height: '100%',
      marginTop: hp(5),
      paddingTop: hp(5),
    },
    listContainer:{},
    card:{
      marginTop:hp(20),
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    },
    firstContainer:{
      flexDirection:"row",
      justifyContent:"flex-start",
      alignItems:"center"
    },
    imgContainer:{
      height:hp(60),
      width:hp(60),
      borderRadius:hp(30),
      overflow:"hidden"
    },
    img:{
      width:"100%",
      height:"100%"
    },
    name:{
      fontSize:FONT_SIZE.h3,
      fontFamily:FONT.PoppinsMedium,
      color:OTHER_COLORS.primaryBlack,
      textTransform:"capitalize"
    },
    textContainer:{
      marginLeft:hp(10)
    },
    text:{
      fontSize:FONT_SIZE.h3,
      fontFamily:FONT.PoppinsRegular,
      color:OTHER_COLORS.secondaryText,
    },
    numContainer:{
      height:hp(24),
      width:hp(24),
      borderRadius:hp(12),
      backgroundColor:OTHER_COLORS.green,
      justifyContent:"center",
      alignItems:"center"
    },
    numberOfMessages:{
      fontSize:FONT_SIZE.h4,
      fontFamily:FONT.PoppinsRegular,
      color:OTHER_COLORS.white
    }
    })
  },[hp,wp,FONT,FONT_SIZE,OTHER_COLORS])

  const renderList=({item}:any)=>{
    const{image,name,text,numberOfMessages}=item;
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.firstContainer}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={image}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
        {numberOfMessages > 0 ? (
          <View style={styles.numContainer}>
          <Text style={styles.numberOfMessages}>{numberOfMessages}</Text>
        </View>
        ): null}
      </TouchableOpacity>
    )
  }
  return (
    <MainContainer>
            <Text style={styles.title}>message</Text>
            <View style={styles.searchContainer}>
          <AnyIcon
            type={IconType.EvilIcons}
            name="search"
            color={OTHER_COLORS.border}
            size={16}
          />
          <TextInput
            style={styles.input}
            placeholder="Search here"
            placeholderTextColor={OTHER_COLORS.border}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList 
          data={data}
          renderItem={renderList}
          />
        </View>
    </MainContainer>
  )
}
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../enums';
import { topTrending } from '../utils';

export const Category = () => {
    const {hp,wp}=useResponsiveDimensions();
    const styles =useMemo(()=>{
        return StyleSheet.create({
            title:{
                fontSize:FONT_SIZE.h3,
                fontFamily:FONT.PoppinsBold,
                color:OTHER_COLORS.black,
                textTransform:"capitalize"
            },
            card:{
                height:hp(140),
                width:hp(113),
                borderWidth:0.5,
                borderColor:OTHER_COLORS.backButtonBackground,
                borderTopRightRadius:hp(8),
                borderTopLeftRadius:hp(8),
                overflow:"hidden",
                justifyContent:"flex-start",
                alignItems:"center",
                marginTop:hp(12),
                elevation:0.1
            },
            imgContainer:{
                width:"100%",
                height:hp(85)
            },
            img:{
                width:"100%",
                height:"100%"
            },
            columnWrapper: {
                justifyContent: 'space-between',
              },
              name:{
                fontSize:FONT_SIZE.h4,
                fontFamily:FONT.PoppinsMedium,
                color:OTHER_COLORS.black,
                textTransform:"capitalize"
              },
              total:{
                fontSize:FONT_SIZE.h5,
                fontFamily:FONT.PoppinsRegular,
                color:OTHER_COLORS.secondaryText,
              }
        })
    },[hp,wp,FONT,FONT_SIZE,OTHER_COLORS])
    const renderList=({item}:any)=>{
        const {name,image,total}=item;
        return (
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={image}/>
                </View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.total}>{`${total} in total`}</Text>
            </View>
        )
    }
  return (
    <>
    <Text style={styles.title}>category</Text>
    <View>
        <FlatList
        numColumns={3}
        data={topTrending}
        renderItem={renderList}
        columnWrapperStyle={styles.columnWrapper}
        />
    </View>
    </>
  )
}

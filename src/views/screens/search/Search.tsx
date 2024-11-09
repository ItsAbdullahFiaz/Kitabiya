import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { AnyIcon, BackButton, IconType, MainContainer, MaybeYouLike } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../enums'


const data=['history','science fiction','families','humor','thriller','self-help','personal','the wood','adventure'];
export const Search = () => {
    const {hp,wp}=useResponsiveDimensions();
    const styles = useMemo(()=>{
        return StyleSheet.create({
            header:{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center"
            },
            searchContainer:{
                height:hp(40),
                width:hp(329),
                borderRadius:hp(12),
                backgroundColor:OTHER_COLORS.backButtonBackground,
                flexDirection:"row",
                justifyContent:"flex-start",
                alignItems:"center",
                paddingLeft:hp(10)
            },
            input:{
                height:"100%",
                marginTop:hp(5),
                paddingTop:hp(5)
            },
            recent:{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                marginTop:hp(20)
            },
            text:{
                fontSize:FONT_SIZE.h5,
                fontFamily:FONT.PoppinsMedium,
                color:OTHER_COLORS.darkBlack,
                textTransform:"capitalize"
            },
            textContainer:{
                height:hp(26),
                borderRadius:hp(12),
                paddingHorizontal:hp(10),
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"row",
                backgroundColor:"rgba(90, 108, 248, 0.1)",
                marginHorizontal:hp(6),
                marginVertical:hp(10)

            },
            btnText:{
                fontSize:FONT_SIZE.h5,
                fontFamily:FONT.PoppinsMedium,
                color:OTHER_COLORS.secondaryText,
            },
            searchedText:{
                fontSize:FONT_SIZE.h5,
                fontFamily:FONT.PoppinsRegular,
                color:OTHER_COLORS.primary,
                marginRight:hp(8),
                textTransform:"capitalize"
            },
            listContainer:{
                flexDirection:"row",
                flexWrap:'wrap',
                marginTop:hp(10)
            }
        })
    },[hp,wp,FONT,FONT_SIZE,OTHER_COLORS])

  return (
    <MainContainer>
        <View style={styles.header}>
            <BackButton/>
            <View style={styles.searchContainer}>
                <AnyIcon 
                type={IconType.EvilIcons}
                name="search"
                color={OTHER_COLORS.border}
                size={16}
                />
               <TextInput style={styles.input} placeholder='Search here' placeholderTextColor={OTHER_COLORS.border}/>
            </View>
        </View>
        <View style={styles.recent}>
            <Text style={styles.text}>recently</Text>
            <TouchableOpacity>
            <Text style={styles.btnText}>Delete all</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
           {data.map((item,index)=>{
            return (
                <View key={index} style={styles.textContainer}>
                    <Text style={styles.searchedText}>{item}</Text>
                    <TouchableOpacity>
                        <AnyIcon 
                        type={IconType.EvilIcons}
                        name='close'
                        size={16}
                        color={OTHER_COLORS.primary}
                        />
                    </TouchableOpacity>
                </View>
            )
           })}
        </View>
        <MaybeYouLike/>
    </MainContainer>
  )
}
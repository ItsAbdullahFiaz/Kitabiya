// import {
//   StatusBar,
//   StyleSheet,
//   TextInput,
//   View,
// } from 'react-native';
// import React, { useContext, useMemo } from 'react';
// import { AnyIcon, IconType } from '../../../components';
// import { useResponsiveDimensions } from '../../../hooks';
// import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../enums';
// import { useNavigation } from '@react-navigation/native';
// import { BookHeader, Category, ContinueReading } from './components';
// import { AppDataContext } from '../../../context';

// export const MyBooksScreen = () => {
//   const {appTheme,appLang}=useContext(AppDataContext);
//   const navigation = useNavigation();
//   const { hp, wp } = useResponsiveDimensions();
//   const styles = useMemo(() => {
//     return StyleSheet.create({
//       mainContainer: {
//         flex: 1,
//         backgroundColor: appTheme.primaryBackground,
//       },
//       searchContainer: {
//         marginTop: hp(20),
//         height: hp(40),
//         width: '100%',
//         borderRadius: hp(12),
//         backgroundColor: appTheme.secondaryBackground,
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         paddingLeft: hp(10),
//       },
//       input: {
//         height: '100%',
//         marginTop: hp(5),
//         paddingTop: hp(5),
//       },
//     });
//   }, [hp, wp]);

//   return (
//     <View style={styles.mainContainer}>
//       <StatusBar barStyle={"dark-content"} backgroundColor={appTheme.primaryBackground} />
//       <View style={{ padding: hp(16) }}>
//         <BookHeader />
//         <View style={styles.searchContainer}>
//           <AnyIcon
//             type={IconType.EvilIcons}
//             name="search"
//             color={appTheme.inputBorder}
//             size={16}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder={appLang.Searchhere}
//             placeholderTextColor={appTheme.inputBorder}
//           />
//         </View>
//       </View>
//       <ContinueReading />
//       <View style={{ padding: hp(16) }}>
//         <Category />
//       </View>
//     </View>
//   );
// };
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AnyIcon, Header, IconType, MainContainer } from '../../../components'
import { FONT_SIZE, TEXT_STYLE } from '../../../enums'
import { useResponsiveDimensions } from '../../../hooks'
import { AppDataContext } from '../../../context'
import { apiService } from '../../../services/api'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const MyBooksScreen = () => {
  const [loading, setLoading] = useState(false);
  const [myAdsList,setMyAdsList]=useState([]);
  const {hp,wp}=useResponsiveDimensions();
  const {appTheme,appLang}=useContext(AppDataContext);
  const fetchProducts = async () => {
    try {
        setLoading(true);
        const userId = await AsyncStorage.getItem('BACKEND_USERID');
        console.log("USER_ID===>",userId);
        const response = await apiService.getProductsByUser(userId);
        console.log("PRODUCTS_BY_USERID_RESPONSE===>",JSON.stringify(response.data));
        if (response.error) {
            throw new Error(response.message || 'Failed to fetch products');
        }

        // Assuming the API returns products sorted by createdAt
        setMyAdsList(response.data || []);
    } catch (error) {
        console.error('Error fetching products:', error);
        // You might want to show an error toast here
    } finally {
        setLoading(false);
    }
};
useEffect(()=>{
  fetchProducts();
},[])
  const styles = useMemo(()=>{
    return StyleSheet.create({
      title: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h1),
        color: appTheme.primaryTextColor,
        textAlign: "center",
        textTransform: "capitalize"
      },
      listContainer:{},
      adContainer:{
        height:hp(200),
        width:"100%",
        // backgroundColor:"red",
        borderWidth:0.5,
        borderColor:appTheme.inputBorder,
        marginTop:hp(10),
        borderRadius:hp(8),
        overflow:'hidden'
      }
    })
  },[hp,wp])
  return (
    <MainContainer>
      <Text style={styles.title}>{appLang.myads}</Text>
      <View style={styles.listContainer}>
        <FlatList
        data={myAdsList}
        renderItem={({item})=>{
          return (
            <TouchableOpacity style={styles.adContainer}>
              <View style={{width:"100%",height:100,backgroundColor:'rgba(0,0,0,0.1)',flexDirection:"row",justifyContent:"space-between",alignItems:"flex-start",padding:10}}>
                <View>
                  <Image style={{height:50,width:50}} source={{uri:item.images[0]}}/>
                </View>
                <AnyIcon
                type={IconType.SimpleLineIcons}
                name='options-vertical'
                size={hp(FONT_SIZE.h1)}
                color={appTheme.darkBlack}
                />
              </View>
            </TouchableOpacity>
          )
        }}
        />
      </View>
    </MainContainer>
  )
}

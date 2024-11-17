// import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
// import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../enums'
// import { useResponsiveDimensions } from '../../../hooks'
// import { AdTitle, Condition, Description, Language, Location, Price, Type } from './components'
// import { AppDataContext } from '../../../context'
// import { AnyIcon, Header, IconType, MainButton, MainContainer } from '../../../components'
// import { Instructions } from '../../../components/unused'
// import {launchImageLibrary} from 'react-native-image-picker';
// import {launchCamera} from 'react-native-image-picker';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// export const AddScreen = () => {
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const [selectedImage,setSelectedImage]=useState<any>('')
//   const {appTheme} = useContext(AppDataContext);
//   const {hp,wp}=useResponsiveDimensions();

//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);
//   const handleOpenPress = () => bottomSheetRef.current?.expand();

//   const openImagePicker = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('Image picker error: ', response.error);
//       } else {
//         let imageUri = response.uri || response.assets?.[0]?.uri;
//         setSelectedImage(imageUri);
//       }
//     });
//   };
//   const handleCameraLaunch = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };
  
//     launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled camera');
//       } else if (response.error) {
//         console.log('Camera Error: ', response.error);
//       } else {
//         let imageUri = response.uri || response.assets?.[0]?.uri;
//         setSelectedImage(imageUri);
//         console.log(imageUri);
//       }
//     });
//   }
//   const styles =useMemo(()=>{
//      return StyleSheet.create({
//       categoryContainer:{
//         marginTop:hp(30)
//       },
//       titleContainer:{
//         flexDirection:"row",
//         justifyContent:"flex-start",
//         alignItems:"center"
//       },
//       title:{
//         ...TEXT_STYLE.bold,
//         fontSize:hp(FONT_SIZE.h3),
//         color:appTheme.primaryTextColor,
//         textTransform:"capitalize",
//         marginRight:hp(5)
//     },
//     booksContainer:{
//       marginTop:hp(15),
//       flexDirection:"row",
//       justifyContent:"flex-start",
//       alignItems:"center"
//     },
//     imgContainer:{
//       height:hp(50),
//       width:hp(50),
//       borderRadius:hp(25),
//       overflow:"hidden",
//       marginRight:hp(10)
//     },
//     img:{
//       height:"100%",
//       width:"100%"
//     },
//     booksHeading:{
//       ...TEXT_STYLE.bold,
//       fontSize:hp(FONT_SIZE.h3),
//         color:appTheme.primaryTextColor,
//     },
//     books:{
//       ...TEXT_STYLE.regular,
//       fontSize:hp(FONT_SIZE.h4),
//       color:appTheme.tertiaryTextColor
//     },
//     uploadContainer:{
//       marginTop:hp(10),
//       width:"100%",
//       height:hp(252),
//       borderWidth:0.5,
//       borderColor:appTheme.grey,
//       borderRadius:hp(8),
//       justifyContent:"center",
//       alignItems:"center"
//     },
//     dummyImg:{
//       width:hp(150),
//       height:hp(80)
//     },
//     btnContainer:{
//       marginVertical:hp(10),
//       height:hp(44),
//       paddingHorizontal:hp(18),
//       justifyContent:"center",
//       alignItems:"center",
//       borderWidth:0.5,
//       borderColor:appTheme.primary,
//       borderRadius:hp(8)
//     },
//     btnText:{
//       ...TEXT_STYLE.medium,
//       fontSize:hp(FONT_SIZE.h3),
//       color:appTheme.primary,
//       textTransform:"capitalize"
//     },
//     border:{
//       borderWidth:0.2,
//       borderColor:appTheme.tertiaryTextColor,
//       marginTop:hp(20)
//     }
//     })
//   },[hp,wp])
//   return (
//     <MainContainer>
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <Header title="ad details"/>
//       <View style={styles.categoryContainer}>
//         <View style={styles.titleContainer}>
//         <Text style={styles.title}>category</Text>
//         <AnyIcon 
//         type={IconType.FontAwesome5}
//         name='star-of-life'
//         size={hp(8)}
//         color={appTheme.compulsory}
//         />
//         </View>
//         <View style={styles.booksContainer}>
//           <View style={styles.imgContainer}>
//             <Image style={styles.img} source={require("../../../assets/images/books.jpg")}/>
//           </View>
//           <View>
//             <Text style={styles.booksHeading}>Books, Sports & Hobbies</Text>
//             <Text style={styles.books}>Books</Text>
//           </View>
//         </View>
//         <View style={styles.uploadContainer}>
//           <Image style={styles.dummyImg} source={require("../../../assets/images/file.png")}/>
//           <TouchableOpacity style={styles.btnContainer} onPress={handleOpenPress}>
//             <Text style={styles.btnText}>add images</Text>
//           </TouchableOpacity>
//           <Instructions textAlign="center">5MB maximum file size accepted in the following formats: .jpg .jpeg .png .gif</Instructions>
//         </View>
//       </View>
//       <Condition/>
//       <Type/>
//       <Language/>
//       <View style={styles.border}/>
//       <AdTitle/>
//       <Description/>
//       <Location/>
//       <View style={styles.border}/>
//       <Price/>
//       <MainButton
//             onPress={() => console.warn("Pressed")}
//             buttonText="next"
//           />
//           <GestureHandlerRootView style={{flex: 1,
//     backgroundColor: 'grey'}}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         onChange={handleSheetChanges}
//       >
//         <BottomSheetView style={{flex: 1,
//     padding: 36,
//     alignItems: 'center'}}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheet>
//     </GestureHandlerRootView>
//       </ScrollView>
//     </MainContainer>
//   )
// }

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../enums';
import { useResponsiveDimensions } from '../../../hooks';
import { AdTitle, Condition, Description, Language, Location, Price, Type } from './components';
import { AppDataContext } from '../../../context';
import { AnyIcon, Header, IconType, MainButton, MainContainer } from '../../../components';
import { Instructions } from '../../../components/unused';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export const AddScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { appTheme } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenPress = () => {
    console.log('Opening BottomSheet...',bottomSheetRef.current);
    // Open bottom sheet when "Add Images" is pressed
    bottomSheetRef.current?.snapToIndex(1);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      categoryContainer: {
        marginTop: hp(30),
      },
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      title: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
        marginRight: hp(5),
      },
      booksContainer: {
        marginTop: hp(15),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      imgContainer: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        overflow: 'hidden',
        marginRight: hp(10),
      },
      img: {
        height: '100%',
        width: '100%',
      },
      booksHeading: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
      },
      books: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.tertiaryTextColor,
      },
      uploadContainer: {
        marginTop: hp(10),
        width: '100%',
        height: hp(252),
        borderWidth: 0.5,
        borderColor: appTheme.grey,
        borderRadius: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
      },
      dummyImg: {
        width: hp(150),
        height: hp(80),
      },
      btnContainer: {
        marginVertical: hp(10),
        height: hp(44),
        paddingHorizontal: hp(18),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: appTheme.primary,
        borderRadius: hp(8),
      },
      btnText: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primary,
        textTransform: 'capitalize',
      },
      border: {
        borderWidth: 0.2,
        borderColor: appTheme.tertiaryTextColor,
        marginTop: hp(20),
      },
      sheetContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      sheetButton: {
        marginVertical: 10,
        padding: 12,
        backgroundColor: appTheme.primary,
        borderRadius: 8,
      },
      sheetButtonText: {
        color: 'white',
        fontSize: hp(FONT_SIZE.h4),
      },
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header title="Ad Details" />
        <View style={styles.categoryContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Category</Text>
            <AnyIcon
              type={IconType.FontAwesome5}
              name="star-of-life"
              size={hp(8)}
              color={appTheme.compulsory}
            />
          </View>
          <View style={styles.booksContainer}>
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={require('../../../assets/images/books.jpg')} />
            </View>
            <View>
              <Text style={styles.booksHeading}>Books, Sports & Hobbies</Text>
              <Text style={styles.books}>Books</Text>
            </View>
          </View>
          <View style={styles.uploadContainer}>
            <Image style={styles.dummyImg} source={require('../../../assets/images/file.png')} />
            <TouchableOpacity style={styles.btnContainer} onPress={handleOpenPress}>
              <Text style={styles.btnText}>Add Images</Text>
            </TouchableOpacity>
            <Instructions textAlign="center">
              5MB maximum file size accepted in the following formats: .jpg .jpeg .png .gif
            </Instructions>
          </View>
        </View>
        {/* <Condition />
        <Type />
        <Language />
        <View style={styles.border} />
        <AdTitle />
        <Description />
        <Location />
        <View style={styles.border} />
        <Price />
        <MainButton onPress={() => console.warn('Pressed')} buttonText="Next" /> */}

        <GestureHandlerRootView style={{ flex: 1 }}>
  <BottomSheet
    ref={bottomSheetRef}
    snapPoints={['25%', '50%', '75%']}
    enablePanDownToClose // Use this to initially hide the sheet
    onChange={handleSheetChanges}
    backgroundStyle={{backgroundColor:"red"}}
  >
    <BottomSheetView style={styles.sheetContent}>
      <TouchableOpacity style={styles.sheetButton} onPress={openImagePicker}>
        <Text style={styles.sheetButtonText}>Select Image from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sheetButton} onPress={handleCameraLaunch}>
        <Text style={styles.sheetButtonText}>Take Photo with Camera</Text>
      </TouchableOpacity>
    </BottomSheetView>
  </BottomSheet>
</GestureHandlerRootView>
      </ScrollView>
    </MainContainer>
  );
};

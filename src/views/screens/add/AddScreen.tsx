import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo,useState} from 'react';
import {FONT_SIZE, TEXT_STYLE} from '../../../enums';
import {useResponsiveDimensions} from '../../../hooks';
import {
  AdTitle,
  BottomSheetComponent,
  Condition,
  Description,
  Language,
  Location,
  Price,
  RemoveSheet,
  Type,
} from './components';
import {AppDataContext} from '../../../context';
import {
  AnyIcon,
  Header,
  IconType,
  MainButton,
  MainContainer,
} from '../../../components';
import {Instructions} from '../../../components/unused';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export const AddScreen = () => {
  const [imagesList,setImagesList]=useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [myIndex, setMyIndex] = useState<any>("");

  const handleModal = (val: any) => {
    setIsModalOpen(val);
  };

  const handleRemoveModal=(val : any) =>{
    setIsRemoveModalOpen(val); 
  }

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log('IMAGE===>', imageUri);
        setImagesList((prev)=>[...prev,imageUri]);
        setIsModalOpen(false);
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

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log('IMAGE===>', imageUri);
        setImagesList((prev)=>[...prev,imageUri]);
        setIsModalOpen(false);
      }
    });
  };

  const handleOpenAndDelete=(index:number)=>{
    setIsRemoveModalOpen(true);
    setMyIndex(index);
  }
  const removeImage=(id:any)=>{
    const remaining=imagesList.filter((item:any,index:any)=>index !== id);
    console.log("REMAINING===>",remaining);
    setImagesList(remaining);
    setIsRemoveModalOpen(false);
  }

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
      imagesContainer: {
        padding:hp(16),
        marginTop: hp(10),
        width: '100%',
        height: hp(152),
        borderWidth: 0.5,
        borderColor: appTheme.grey,
        borderRadius: hp(8),
        justifyContent:"space-between"
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
      nextBtnContainer: {
        marginTop: hp(20),
      },
      addImage:{
        height:hp(70),
        width:hp(70),
        borderWidth:0.5,
        borderColor:appTheme.tertiaryTextColor,
        borderRadius:hp(8),
        justifyContent:"center",
        alignItems:"center",
        marginRight:hp(5)
      },
      listImg:{
        height:hp(70),
        width:hp(70),
        borderRadius:hp(8),
        overflow:"hidden",
        marginRight:hp(5)
      },
      listContainer:{
        width:"100%"
      }
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              <Image
                style={styles.img}
                source={require('../../../assets/images/books.jpg')}
              />
            </View>
            <View>
              <Text style={styles.booksHeading}>Books, Sports & Hobbies</Text>
              <Text style={styles.books}>Books</Text>
            </View>
          </View>
          {imagesList.length>0 ? (
            <View style={styles.imagesContainer}>
              <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.addImage} onPress={()=>setIsModalOpen(true)}>
                  <AnyIcon
                  type={IconType.Ionicons}
                  name='add'
                  size={hp(20)}
                  color='blue'
                  />
                </TouchableOpacity>
                <View style={styles.listContainer}>
                  <FlatList
                  horizontal
                  data={imagesList}
                  renderItem={({item,index})=>{
                    console.log("FLATLIST_INDEX===>",index);
                    return (
                    <TouchableOpacity style={styles.listImg} onPress={()=>handleOpenAndDelete(index)}>
                      <Image style={{width:"100%",height:"100%"}} source={{uri:item}}/>
                    </TouchableOpacity>
                    )
                  }}
                  />
                </View>
              </View>
              <View>
                <Text>Top on images to edit them, or press, hold and move for reordering.</Text>
              </View>
            </View>
          ) : (
            <View style={styles.uploadContainer}>
            <Image
              style={styles.dummyImg}
              source={require('../../../assets/images/file.png')}
            />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={()=>setIsModalOpen(true)}>
              <Text style={styles.btnText}>Add Images</Text>
            </TouchableOpacity>
            <Instructions textAlign="center">
              5MB maximum file size accepted in the following formats: .jpg
              .jpeg .png .gif
            </Instructions>
          </View>
          )}
        </View>
        <Condition />
        <Type />
        <Language />
        <View style={styles.border} />
        <AdTitle />
        <Description />
        <Location />
        <View style={styles.border} />
        <Price />
        <View style={styles.nextBtnContainer}>
          <MainButton
            onPress={() => console.warn('Pressed')}
            buttonText="Next"
          />
        </View>
        <Modal visible={isModalOpen} transparent>
          <BottomSheetComponent
            handleModal={handleModal}
            handleCameraLaunch={handleCameraLaunch}
            openImagePicker={openImagePicker}
          />
        </Modal>
        <Modal visible={isRemoveModalOpen} transparent>
          <RemoveSheet
          handleRemoveModal={handleRemoveModal}
          removeImage={removeImage}
          index={myIndex}
          />
        </Modal>
      </ScrollView>
    </MainContainer>
  );
};

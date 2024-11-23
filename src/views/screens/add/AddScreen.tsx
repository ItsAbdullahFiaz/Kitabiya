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
import React, { useContext, useMemo, useState } from 'react';
import { FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE } from '../../../enums';
import { useResponsiveDimensions, useToast } from '../../../hooks';
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
import { AppDataContext } from '../../../context';
import {
  AnyIcon,
  Header,
  IconType,
  MainButton,
  MainContainer,
} from '../../../components';
import { Instructions } from '../../../components/unused';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { apiService } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AddScreen = ({ route }: any) => {
  const { dataType } = route.params || 'add';
  const { data } = route.params || [];
  console.log("TYPE===>", dataType);
  console.log("TYPE_DATA===>", data);
  const [imagesList, setImagesList] = useState<any>(dataType === 'edit' ? data?.images : []);
  const { appTheme } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [myIndex, setMyIndex] = useState<any>("");
  const [selected, setSelected] = useState(dataType === 'edit' ? data?.condition : null);
  const [type, setType] = useState(dataType === 'edit' ? data?.type : "choose");
  const [language, setLanguage] = useState(dataType === 'edit' ? data?.language : "choose");
  const [location, setLocation] = useState(dataType === 'edit' ? data?.locationAddress : "choose");
  const [bookTitle, setBookTitle] = useState(dataType === 'edit' ? data?.title : "");
  const [description, setDescription] = useState(dataType === 'edit' ? data?.description : "");
  const [price, setPrice] = useState(dataType === 'edit' ? data?.price?.toString() : "");
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const navigation = useNavigation<any>();

  const updateProduct = async (productId:any) => {
    try {
      setLoading(true);
      const formData = await createFormData();
      const response = await apiService.updateProduct(productId,formData);
      console.log(
        'PRODUCTS_BY_USERID_RESPONSE===>',
        JSON.stringify(response.data),
      );
      navigation.navigate(SCREENS.MY_BOOK as never);
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (type: any) => {
    setSelected(type);
  };
  const handleSelectType = (type: any) => {
    console.log("TYPE===>", type);
    setType(type);
  };
  const handleSelectLanguage = (type: any) => {
    console.log("Language===>", type);
    setLanguage(type);
  };
  const handleSelectLocation = (type: any) => {
    console.log("Location===>", type);
    setLocation(type);
  };
  const handleSelectTitle = (val: any) => {
    console.log("Book_TITLe===>", val);
    setBookTitle(val);
  }
  const handleDescription = (val: any) => {
    console.log("Book_Description===>", val);
    setDescription(val);
  }
  const handlePrice = (val: any) => {
    console.log("Book_Price===>", val);
    setPrice(val);
  }

  const handleModal = (val: any) => {
    setIsModalOpen(val);
  };

  const handleRemoveModal = (val: any) => {
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
        setImagesList((prev) => [...prev, imageUri]);
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
        setImagesList((prev) => [...prev, imageUri]);
        setIsModalOpen(false);
      }
    });
  };

  const handleOpenAndDelete = (index: number) => {
    setIsRemoveModalOpen(true);
    setMyIndex(index);
  }
  const removeImage = (id: any) => {
    const remaining = imagesList.filter((item: any, index: any) => index !== id);
    setImagesList(remaining);
    setIsRemoveModalOpen(false);
  }

  const createFormData = async () => {
    const formData = new FormData();
    const userId = await AsyncStorage.getItem('BACKEND_USERID');

    if (!userId) {
      throw new Error('User ID not found');
    }

    // Add images
    imagesList.forEach((uri: string, index: number) => {
      formData.append('images', {
        uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`
      });
    });

    // Add all required fields
    formData.append('userId', userId);
    formData.append('title', bookTitle);
    formData.append('price', price);
    formData.append('condition', selected);
    formData.append('type', type);
    formData.append('language', language);
    formData.append('description', description);
    formData.append('categoryId', 'cat1');
    formData.append('categorySubId', 'subcat1');
    formData.append('locationLatitude', '31.5204');
    formData.append('locationLongitude', '74.3587');
    formData.append('locationAddress', location || 'Lahore, Pakistan');

    console.log('FormData:', formData);
    return formData;
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (!imagesList.length) {
        return showToast('Please add at least one image', 'errorToast');
      }
      if (!selected || selected === 'choose') {
        return showToast('Please select condition', 'errorToast');
      }
      if (!type || type === 'choose') {
        return showToast('Please select type', 'errorToast');
      }
      if (!language || language === 'choose') {
        return showToast('Please select language', 'errorToast');
      }
      if (!bookTitle.trim()) {
        return showToast('Please enter book title', 'errorToast');
      }
      if (!description.trim()) {
        return showToast('Please enter description', 'errorToast');
      }
      if (!location || location === 'choose') {
        return showToast('Please select location', 'errorToast');
      }
      if (!price.trim()) {
        return showToast('Please enter price', 'errorToast');
      }

      setLoading(true);
      const formData = await createFormData();

      const response = await apiService.createProduct(formData);

      if (response.error) {
        throw new Error(response.message || 'Failed to create product');
      }

      // Success
      showToast('Product added successfully', 'successToast');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating product:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to create product',
        'errorToast'
      );
    } finally {
      setLoading(false);
    }
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
        borderColor: appTheme.borderDefault,
        borderRadius: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
      },
      imagesContainer: {
        padding: hp(16),
        marginTop: hp(10),
        width: '100%',
        height: hp(152),
        borderWidth: 0.5,
        borderColor: appTheme.borderDefault,
        borderRadius: hp(8),
        justifyContent: "space-between"
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
      addImage: {
        height: hp(70),
        width: hp(70),
        borderWidth: 0.5,
        borderColor: appTheme.tertiaryTextColor,
        borderRadius: hp(8),
        justifyContent: "center",
        alignItems: "center",
        marginRight: hp(5)
      },
      listImg: {
        height: hp(70),
        width: hp(70),
        borderRadius: hp(8),
        overflow: "hidden",
        marginRight: hp(5)
      },
      listContainer: {
        width: "100%"
      },
      loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header title={dataType === 'edit' ? 'edit ad details' : 'ad Details'} />
        {/* <Header title="ad details"/> */}
        <View style={styles.categoryContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Category</Text>
            <AnyIcon
              type={IconType.FontAwesome5}
              name="star-of-life"
              size={hp(8)}
              color={OTHER_COLORS.red}
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
          {imagesList.length > 0 ? (
            <View style={styles.imagesContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.addImage} onPress={() => setIsModalOpen(true)}>
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
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity style={styles.listImg} onPress={() => handleOpenAndDelete(index)}>
                          <Image style={{ width: "100%", height: "100%" }} source={{ uri: item }} />
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
                onPress={() => setIsModalOpen(true)}>
                <Text style={styles.btnText}>Add Images</Text>
              </TouchableOpacity>
              <Instructions textAlign="center">
                5MB maximum file size accepted in the following formats: .jpg
                .jpeg .png .gif
              </Instructions>
            </View>
          )}
        </View>
        <Condition handleSelect={handleSelect} selected={selected} />
        <Type handleSelectType={handleSelectType} type={type} />
        <Language handleSelectLanguage={handleSelectLanguage} language={language} />
        <View style={styles.border} />
        <AdTitle bookTitle={bookTitle} handleSelectTitle={handleSelectTitle} />
        <Description handleDescription={handleDescription} description={description} />
        <Location handleSelectLocation={handleSelectLocation} location={location} />
        <View style={styles.border} />
        <Price handlePrice={handlePrice} price={price} />
        <View style={styles.nextBtnContainer}>
          {dataType === 'edit' ? (
            <MainButton
              onPress={()=>updateProduct(data?._id)}
              buttonText="Update"
              isLoading={loading}
              disableBtn={loading}
            />
          ) : (
            <MainButton
              onPress={handleSubmit}
              buttonText="Next"
              isLoading={loading}
              disableBtn={loading}
            />
          )}
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
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.btnText}>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </MainContainer>
  );
};
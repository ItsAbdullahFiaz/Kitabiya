import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE} from '../../../enums';
import {useResponsiveDimensions, useToast} from '../../../hooks';
import {
  AdTitle,
  BottomSheetComponent,
  Condition,
  Description,
  DropDownComponent,
  Price,
  RemoveSheet,
} from './components';
import {AppDataContext} from '../../../context';
import {
  AnyIcon,
  Header,
  IconType,
  MainButton,
  MainContainer,
} from '../../../components';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {apiService} from '../../../services/api';
import {useNavigation} from '@react-navigation/native';
import {dropdownItems, languageitem, typeitem} from '../../../utils';
import {ImageSelector} from './components/ImageSelector';
import {
  useCreateProduct,
  useDeleteProduct,
  useMyProducts,
} from '../../../hooks/useProducts';
import {useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '../../../hooks/useProducts';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export const AddScreen = ({route}: any) => {
  const {dataType} = route.params || 'add';
  const {data} = route.params || [];
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [myIndex, setMyIndex] = useState<any>('');
  const [searchText, setSearchText] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [imagesList, setImagesList] = useState<any>(
    dataType === 'edit' ? data?.images : [],
  );
  const [selected, setSelected] = useState(
    dataType === 'edit' ? data?.condition : null,
  );
  const [type, setType] = useState(dataType === 'edit' ? data?.type : 'choose');
  const [language, setLanguage] = useState(
    dataType === 'edit' ? data?.language : 'choose',
  );
  const [location, setLocation] = useState(
    dataType === 'edit' ? data?.locationAddress : 'choose',
  );
  const [bookTitle, setBookTitle] = useState(
    dataType === 'edit' ? data?.title : '',
  );
  const [description, setDescription] = useState(
    dataType === 'edit' ? data?.description : '',
  );
  const [price, setPrice] = useState(
    dataType === 'edit' ? data?.price?.toString() : '',
  );
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const navigation = useNavigation<any>();

  const createProduct = useCreateProduct();
  const queryClient = useQueryClient();

  const fetchLocation = async () => {
    try {
      setLocationLoading(true); 
      Geolocation.getCurrentPosition(info =>{
        getLocationName(info.coords.latitude, info.coords.longitude);
        setLocationLoading(false);
      } 
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getLocationName = async (latitude: number, longitude: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await axios.get(url);
      const address = response.data.name;
      console.log('Location Name:', address);
      setSearchText(address);
      setLocationLoading(false);
    } catch (error) {
      console.error('Error getting location name:', error);
      setLocationLoading(false);
      return null;
    }
  };
  const updateProduct = async (productId: string) => {
    try {
      if (!validateInputs()) return;

      setLoading(true);
      const formData = await createFormData();
      const response = await apiService.updateProduct(productId, formData);

      if (response.error) {
        throw new Error(response.message || 'Failed to update product');
      }

      showToast('Product updated successfully', 'successToast');
      navigation.navigate(SCREENS.MY_BOOK as never);
    } catch (error) {
      console.error('Error updating product:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to update product',
        'errorToast',
      );
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    if (!imagesList.length) {
      showToast('Please add at least one image', 'errorToast');
      return false;
    }
    if (!selected || selected === 'choose') {
      showToast('Please select condition', 'errorToast');
      return false;
    }
    if (!type || type === 'choose') {
      showToast('Please select type', 'errorToast');
      return false;
    }
    if (!language || language === 'choose') {
      showToast('Please select language', 'errorToast');
      return false;
    }
    if (!bookTitle.trim()) {
      showToast('Please enter book title', 'errorToast');
      return false;
    }
    if (!description.trim()) {
      showToast('Please enter description', 'errorToast');
      return false;
    }
    if (!location || location === 'choose') {
      showToast('Please select location', 'errorToast');
      return false;
    }
    if (!price.trim()) {
      showToast('Please enter price', 'errorToast');
      return false;
    }
    return true;
  };

  const handleSelect = (type: any) => {
    setSelected(type);
  };
  const handleSelectType = (type: any) => {
    console.log('TYPE===>', type);
    setType(type);
  };
  const handleSelectLanguage = (type: any) => {
    console.log('Language===>', type);
    setLanguage(type);
  };
  const handleSelectLocation = (type: any) => {
    console.log('Location===>', type);
    setLocation(type);
  };
  const handleSelectTitle = (val: any) => {
    console.log('Book_TITLe===>', val);
    setBookTitle(val);
  };
  const handleDescription = (val: any) => {
    console.log('Book_Description===>', val);
    setDescription(val);
  };
  const handlePrice = (val: any) => {
    console.log('Book_Price===>', val);
    setPrice(val);
  };

  const handleModal = (val: any) => {
    setIsModalOpen(val);
  };

  const handleRemoveModal = (val: any) => {
    setIsRemoveModalOpen(val);
  };

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
        setImagesList(prev => [...prev, imageUri]);
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
        setImagesList(prev => [...prev, imageUri]);
        setIsModalOpen(false);
      }
    });
  };

  const handleOpenAndDelete = (index: number) => {
    setIsRemoveModalOpen(true);
    setMyIndex(index);
  };
  const handleImageSelectorModal = (val: boolean) => {
    setIsModalOpen(val);
  };
  const removeImage = (id: any) => {
    const remaining = imagesList.filter(
      (item: any, index: any) => index !== id,
    );
    setImagesList(remaining);
    setIsRemoveModalOpen(false);
  };

  const createFormData = async () => {
    const formData = new FormData();

    // Add images
    imagesList.forEach((uri: string, index: number) => {
      formData.append('images', {
        uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      });
    });

    // Add only the required fields that match the API
    formData.append('title', bookTitle);
    formData.append('price', price);
    formData.append('condition', selected);
    formData.append('type', type);
    formData.append('language', language);
    formData.append('description', description);
    formData.append('locationAddress', location);

    console.log('FormData:', formData);
    return formData;
  };

  const resetForm = () => {
    setImagesList([]);
    setSelected(null);
    setType('choose');
    setLanguage('choose');
    setLocation('choose');
    setBookTitle('');
    setDescription('');
    setPrice('');
  };

  const handleSubmit = async () => {
    try {
      if (!validateInputs()) return;

      const formData = await createFormData();
      await createProduct.mutateAsync(formData, {
        onSuccess: () => {
          showToast('Product added successfully', 'successToast');
          resetForm();
          queryClient.invalidateQueries([QUERY_KEYS.MY_PRODUCTS]);
          navigation.navigate(SCREENS.MY_BOOK as never);
        },
        onError: (error: any) => {
          showToast(
            error instanceof Error ? error.message : 'Failed to create product',
            'errorToast',
          );
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to create product',
        'errorToast',
      );
    }
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
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
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      label: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      title: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
        marginRight: hp(5),
      },
      inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
      },
      textInput: {
        flex: 1, 
        fontSize: 14,
        marginRight: 10, 
      },
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Header
          title={dataType === 'edit' ? 'edit ad details' : 'ad Details'}
        />
        <ImageSelector
          imagesList={imagesList}
          handleImageSelectorModal={handleImageSelectorModal}
          handleOpenAndDelete={handleOpenAndDelete}
        />
        <Condition handleSelect={handleSelect} selected={selected} />
        <DropDownComponent
          handleSelectOption={handleSelectType}
          type={type}
          dropdownItems={typeitem}
          label="Type"
        />
        <DropDownComponent
          handleSelectOption={handleSelectLanguage}
          type={language}
          dropdownItems={languageitem}
          label="Language"
        />
        <View style={styles.border} />
        <AdTitle bookTitle={bookTitle} handleSelectTitle={handleSelectTitle} />
        <Description
          handleDescription={handleDescription}
          description={description}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Address</Text>
          <AnyIcon
            type={IconType.FontAwesome5}
            name="star-of-life"
            size={hp(8)}
            color={OTHER_COLORS.red}
          />
        </View>
        <View style={styles.inputContainer}>
  <TextInput
    placeholder="Write area, city or country"
    style={styles.textInput}
    value={searchText} 
    onChangeText={setSearchText}
    
  />
  <TouchableOpacity onPress={fetchLocation} disabled={locationLoading}>
    {locationLoading ? (
      <AnyIcon
        type={IconType.FontAwesome5}
        name="spinner"
        size={20}
        color={appTheme.primary}
        style={{transform: [{rotate: '360deg'}]}}
      />
    ) : (
      <AnyIcon
        type={IconType.FontAwesome6}
        name="location-crosshairs"
        size={20}
        color={appTheme.primary}
      />
    )}
  </TouchableOpacity>
 
</View>


        {/* <DropDownComponent
          handleSelectOption={handleSelectLocation}
          type={location}
          dropdownItems={dropdownItems}
          label="Location"
        /> */}
        <View style={styles.border} />
        <Price handlePrice={handlePrice} price={price} />
        <View style={styles.nextBtnContainer}>
          {dataType === 'edit' ? (
            <MainButton
              onPress={() => updateProduct(data?._id)}
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

import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {
  CustomInput,
  Header,
  MainButton,
  MainContainer,
} from '../../../components';
import {useResponsiveDimensions, useToast} from '../../../hooks';
import {AppDataContext} from '../../../context';
import {FONT_SIZE, SCREENS, TEXT_STYLE} from '../../../enums';
import {BottomSheetComponent, DropDownComponent} from '../add/components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import {dropdownItems} from '../../../utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {apiService} from '../../../services/api';

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {userData} = route?.params;
  console.log('USER_DATA===>', userData);
  const [userName, setUserName] = useState(
    userData?.name === null ? '' : userData?.name,
  );
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(
    userData?.dateOfBirth === null
      ? 'Select your date of birth'
      : userData?.dateOfBirth,
  );
  const [profileImage, setProfileImage] = useState(
    userData?.photoUrl === null ? '' : userData?.photoUrl,
  );
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(
    userData?.location === null ? 'choose' : userData?.location,
  );
  const [email, setEmail] = useState(
    userData?.email === null ? '' : userData?.email,
  );
  const [wrongNameError, setWrongNameError] = useState('');
  const [wrongEmailError, setWrongEmailError] = useState('');
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme, appLang} = useContext(AppDataContext);
  const showToast = useToast();

  const updateuserDetails = async () => {
    try {
      if (!validateInputs()) return;
      setLoading(true);
      const formData = await createFormData();
      const response = await apiService.updateUserProfileData(formData);
      if (response.error) {
        throw new Error(response.message || 'Failed to update User Details');
      }
      showToast('User Details updated successfully', 'successToast');
      navigation.navigate(SCREENS.ACCOUNT as never);
    } catch (error) {
      console.error('Error updating User Details:', error);
      showToast(
        error instanceof Error
          ? error.message
          : 'Failed to update User Details',
        'errorToast',
      );
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    if (!profileImage.length) {
      showToast('Please add at least one image', 'errorToast');
      return false;
    }
    if (!location || location === 'choose') {
      showToast('Please select location', 'errorToast');
      return false;
    }
    if (!userName || userName === 'Enter UserName') {
      showToast('Please enter userName', 'errorToast');
      return false;
    }
    if (!dateOfBirth || dateOfBirth === 'Enter Date Of Birth') {
      showToast('Please enter Date of birth', 'errorToast');
      return false;
    }
    return true;
  };

  const createFormData = async () => {
    const formData = new FormData();
    // Add only the required fields that match the API
    formData.append('name', userName);
    formData.append('location', location);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('photo', profileImage);
    console.log('FormData:', formData);
    return formData;
  };

  const handleModal = (val: any) => {
    setIsModalOpen(val);
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
        setProfileImage(imageUri);
        setIsModalOpen(false);
      }
    });
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
        setProfileImage(imageUri);
        setIsModalOpen(false);
      }
    });
  };

  const handleSelectLocation = (type: any) => {
    console.log('Location===>', type);
    setLocation(type);
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      imgContainer: {
        height: hp(200),
        width: hp(200),
        borderRadius: hp(100),
        backgroundColor: '#CA5A5A',
        alignSelf: 'center',
        marginTop: hp(50),
      },
      img: {
        width: '100%',
        height: '100%',
        borderRadius: hp(100),
        objectFit: 'cover',
      },
      btnContainer: {
        position: 'absolute',
        top: hp(160),
        right: hp(20),
        zIndex: 1,
      },
      detailsContainer: {
        marginTop: hp(30),
      },
      label: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
        marginBottom: hp(3),
      },
      birthContainer: {
        height: hp(46),
        width: '100%',
        borderWidth: 1,
        borderColor: appTheme.borderDefault,
        borderRadius: hp(8),
        justifyContent: 'center',
        paddingLeft: hp(16),
      },
      birthText: {
        ...TEXT_STYLE.regular,
        color: appTheme.primaryTextColor,
        fontSize: hp(14),
      },
      signupContainer: {
        marginTop: hp(40),
      },
    });
  }, [hp, wp]);
  return (
    <MainContainer>
      <Header title="edit profile" />
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={
            profileImage
              ? {uri: profileImage}
              : require('../../../assets/images/user.png')
          }
        />
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => handleModal(true)}>
          <Image
            style={{height: hp(20), width: hp(20)}}
            source={require('../../../assets/images/camera.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>{appLang.name}</Text>
        <CustomInput
          value={userName}
          setValue={setUserName}
          placeholder={appLang.textname}
          textWrong={wrongNameError}
          onChange={() => setWrongNameError('')}
          bottomError={true}
        />
        <Text style={[styles.label, {marginTop: hp(20)}]}>{appLang.email}</Text>
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={appLang.textemail}
          textWrong={wrongEmailError}
          onChange={() => setWrongEmailError('')}
          bottomError={true}
        />
        <DropDownComponent
          handleSelectOption={handleSelectLocation}
          type={location}
          dropdownItems={dropdownItems}
          label="Location"
          component="profile"
        />
        <Text style={[styles.label, {marginTop: hp(20)}]}>
          {appLang.dateofbirth}
        </Text>
        <TouchableOpacity
          style={styles.birthContainer}
          onPress={() => setOpen(true)}>
          <Text style={styles.birthText}>{dateOfBirth}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <MainButton
          onPress={updateuserDetails}
          buttonText={appLang.savechanges}
          isLoading={loading}
        />
      </View>
      <Modal visible={isModalOpen} transparent>
        <BottomSheetComponent
          handleModal={handleModal}
          handleCameraLaunch={handleCameraLaunch}
          openImagePicker={openImagePicker}
        />
      </Modal>
      <DatePicker
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={comingDate => {
          const date = new Date(comingDate);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          setDateOfBirth(formattedDate);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </MainContainer>
  );
};

import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import {
  CustomInput,
  Header,
  MainButton,
  MainContainer,
} from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { AppDataContext, useAuth } from '../../../context';
import { FONT_SIZE, TEXT_STYLE } from '../../../enums';
import { BottomSheetComponent, DropDownComponent } from '../add/components';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { dropdownItems } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { apiService } from '../../../services/api';

export const ProfileScreen = () => {
  const { authState, updateProfile } = useAuth();
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState(authState.userName || '');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(
    authState.dateOfBirth || 'Select your date of birth',
  );
  const [profileImage, setProfileImage] = useState(
    authState.profilePhoto || '',
  );
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(authState.address || 'choose');
  const [email, setEmail] = useState(authState.email || '');
  const [wrongNameError, setWrongNameError] = useState('');
  const [wrongEmailError, setWrongEmailError] = useState('');
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang } = useContext(AppDataContext);
  const showToast = useToast();

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    return nameRegex.test(name);
  };

  const isFormChanged = () => {
    console.log('Name comparison:', userName.trim(), authState.userName);
    console.log('Location comparison:', location, authState.address);
    console.log('Date comparison:', dateOfBirth, authState.dateOfBirth);
    console.log('Image comparison:', profileImage, authState.profilePhoto);

    const hasNameChanged = userName.trim() !== (authState.userName || '');
    const hasLocationChanged = location !== (authState.address || 'choose');
    const hasDateChanged =
      dateOfBirth !== (authState.dateOfBirth || 'Select your date of birth');
    const hasImageChanged = profileImage !== (authState.profilePhoto || '');

    const isChanged =
      hasNameChanged || hasLocationChanged || hasDateChanged || hasImageChanged;
    console.log('Form changed:', isChanged);

    return isChanged;
  };

  const validateInputs = () => {
    setWrongNameError('');

    // Validate name if changed
    if (userName?.trim() !== authState.userName) {
      if (!userName?.trim()) {
        setWrongNameError('Name is required');
        showToast('Please enter your name', 'errorToast');
        return false;
      }

      if (!validateName(userName.trim())) {
        setWrongNameError('Please enter a valid name (2-30 letters only)');
        showToast('Please enter a valid name', 'errorToast');
        return false;
      }
    }

    return true;
  };

  const formatDateForAPI = (dateString: string) => {
    // Convert from DD-MM-YYYY to YYYY-MM-DD
    if (!dateString || dateString === 'Select your date of birth') return '';

    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const createFormData = async () => {
    const formData = new FormData();

    // Add images
    if (profileImage && profileImage !== authState.profilePhoto) {
      formData.append('photo', {
        uri: profileImage,
        type: 'image/jpeg',
        name: 'profile-photo.jpg',
      });
    }

    // Add other fields only if they've changed
    if (userName.trim() !== authState.userName) {
      formData.append('name', userName.trim());
    }

    if (location !== authState.address) {
      formData.append('location', location);
    }

    if (dateOfBirth !== authState.dateOfBirth) {
      const formattedDate = formatDateForAPI(dateOfBirth);
      if (formattedDate) {
        formData.append('dateOfBirth', formattedDate);
      }
    }

    console.log('FormData:', formData);
    return formData;
  };

  const updateuserDetails = async () => {
    try {
      if (!validateInputs()) return;

      setLoading(true);
      const formData = await createFormData();

      const response = await apiService.updateUserProfileData(formData);
      console.log('Update Response:', response);

      if (response.error) {
        const errorMessage =
          response.message?.message ||
          response.message ||
          'Failed to update profile';
        throw new Error(errorMessage);
      }

      // Update local auth state with the new values
      updateProfile(
        userName.trim() !== authState.userName ? userName.trim() : undefined,
        undefined, // phoneNumber not changed
        location !== authState.address ? location : undefined,
        dateOfBirth !== authState.dateOfBirth ? dateOfBirth : undefined,
        profileImage !== authState.profilePhoto ? profileImage : undefined
      );

      showToast('Profile updated successfully', 'successToast');
      navigation.goBack();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to update profile',
        'errorToast',
      );
    } finally {
      setLoading(false);
    }
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
      } else if (response?.error) {
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <MainContainer>
        <Header title="edit profile" />
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../../assets/images/user.png')
            }
          />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => handleModal(true)}>
            <Image
              style={{ height: hp(20), width: hp(20) }}
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
          <Text style={[styles.label, { marginTop: hp(20) }]}>
            {appLang.email}
          </Text>
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder={appLang.textemail}
            textWrong={wrongEmailError}
            onChange={() => setWrongEmailError('')}
            bottomError={true}
            editable={false}
          />
          <DropDownComponent
            handleSelectOption={handleSelectLocation}
            type={location}
            dropdownItems={dropdownItems}
            label="Location"
            component="profile"
          />
          <Text style={[styles.label, { marginTop: hp(20) }]}>
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
            disableBtn={!isFormChanged()}
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
    </KeyboardAvoidingView>
  );
};

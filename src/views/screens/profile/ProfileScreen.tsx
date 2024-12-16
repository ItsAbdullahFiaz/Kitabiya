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
  AnyIcon,
  CustomInput,
  Header,
  IconType,
  MainButton,
  MainContainer,
} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
import {AppDataContext} from '../../../context';
import {FONT_SIZE, OTHER_COLORS, TEXT_STYLE} from '../../../enums';
import {BottomSheetComponent} from '../add/components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

export const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongNameError, setWrongNameError] = useState('');
  const [wrongEmailError, setWrongEmailError] = useState('');
  const [wrongPasswordError, setWrongPasswordError] = useState('');
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme, appLang} = useContext(AppDataContext);

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
        <Text style={[styles.label, {marginTop: hp(20)}]}>
          {appLang.password}
        </Text>
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder={appLang.textpassword}
          textWrong={wrongPasswordError}
          onChange={() => setWrongPasswordError('')}
          bottomError={true}
          twoLinesError={true}
          secureTextEntry={true}
        />
        <Text style={[styles.label, {marginTop: hp(20)}]}>
          {appLang.dateofbirth}
        </Text>
        <TouchableOpacity
          style={styles.birthContainer}
          onPress={() => setOpen(true)}>
          <Text style={styles.birthText}>Select your date of birth</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <MainButton
          onPress={() => console.warn('Pressed')}
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
          setOpen(false);
          // setDate(formattedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </MainContainer>
  );
};

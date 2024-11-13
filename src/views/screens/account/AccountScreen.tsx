import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {AnyIcon, IconType, MainContainer} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
import {FONT_SIZE, TEXT_STYLE} from '../../../enums';
import {signOutUser} from '../../../services';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {ProfileHeader} from './components';
import {AppDataContext} from '../../../context';

export const AccountScreen = () => {
  const [userInfo, setUserInfo] = useState<any>('');
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const navigation = useNavigation();
  const userDetails = async () => {
    try {
      const user = await auth().currentUser;
      setUserInfo(user);
      console.log('CURRENT_USER===>', user);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    userDetails();
  }, []);
  const styles = useMemo(() => {
    return StyleSheet.create({
      buttonsContainer: {
        marginTop: hp(50),
      },
      btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      btnText: {
        ...TEXT_STYLE.medium,
        marginLeft: hp(20),
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.secondaryTextColor,
      },
      border: {
        borderWidth: 0.2,
        borderColor: appTheme.tertiaryTextColor,
        marginVertical: hp(20),
      },
      secondBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      logoutContainer: {
        marginTop: hp(40),
        height: hp(48),
        width: '100%',
        borderRadius: hp(16),
        borderWidth: 0.5,
        borderColor: appTheme.primary,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoutText: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primary,
        textTransform: 'capitalize',
      },
    });
  }, [hp, wp]);
  return (
    <MainContainer>
      <ProfileHeader userInfo={userInfo} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.Octicons}
            name="person"
            size={hp(24)}
            color={appTheme.primary}
          />
          <Text style={styles.btnText}>Profile</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.secondBtnContainer}>
          <View style={styles.btnContainer}>
            <AnyIcon
              type={IconType.Fontisto}
              name="world-o"
              size={hp(20)}
              color={appTheme.primary}
            />
            <Text style={styles.btnText}>Language</Text>
          </View>
          <Text>Enflish (US)</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.MaterialIcons}
            name="lock-outline"
            size={hp(20)}
            color={appTheme.primary}
          />
          <Text style={styles.btnText}>Privacy Policy</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.MaterialIcons}
            name="info-outline"
            size={hp(20)}
            color={appTheme.primary}
          />
          <Text style={styles.btnText}>Help Center</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.btnContainer}>
          <AnyIcon
            type={IconType.Ionicons}
            name="settings-outline"
            size={hp(20)}
            color={appTheme.primary}
          />
          <Text style={styles.btnText}>Setting</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => signOutUser(navigation)}
        style={styles.logoutContainer}>
        <Text style={styles.logoutText}>log out</Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

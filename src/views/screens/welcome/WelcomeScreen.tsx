import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { FONT, OTHER_COLORS, SCREENS } from '../../../enums';
import { LoginButton, MainContainer, SocialLogins } from '../../../components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1070998124660-c9i2ni7s1itl0t1hv4k3h1076fks2u54.apps.googleusercontent.com',
    });
  }, []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      innerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      },
      img: {
        width: hp(210),
        height: hp(74),
        alignSelf: 'center',
      },
      contentContainer: {
        marginTop: hp(40),
      },
      btnContainer: {
        height: hp(48),
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(30),
        borderWidth: 1,
        borderColor: OTHER_COLORS.primary,
      },
      btnText: {
        fontSize: 16,
        fontWeight: 'medium',
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.primary,
        textTransform: 'capitalize',
      },
    });
  }, [hp, wp, OTHER_COLORS, FONT]);
  return (
    <MainContainer>
      <View style={styles.innerContainer}>
        <Image
          style={styles.img}
          source={require('../../../assets/images/appLogo.png')}
        />
        <View style={styles.contentContainer}>
          <LoginButton
            title="log in"
            onPress={() => navigation.navigate(SCREENS.LOGIN as never)}
          />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate(SCREENS.SIGNUP as never)}>
            <Text style={styles.btnText}>sign up</Text>
          </TouchableOpacity>
          <SocialLogins />
        </View>
      </View>
    </MainContainer>
  );
};

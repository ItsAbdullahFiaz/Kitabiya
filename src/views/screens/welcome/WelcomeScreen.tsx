import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { FONT, FONT_SIZE, OTHER_COLORS, SCREENS, STACK, TEXT_STYLE } from '../../../enums';
import { MainButton, MainContainer, SocialLogins } from '../../../components';
import { AppDataContext } from '../../../context';

export const WelcomeScreen = () => {
  const {appTheme,appLang}=useContext(AppDataContext);
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();

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
        borderColor: appTheme.primary,
      },
      btnText: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        fontWeight: 'medium',
        color: appTheme.primary,
        textTransform: 'capitalize',
      },
    });
  }, [hp, wp]);

  return (
    <MainContainer>
      <View style={styles.innerContainer}>
        <Image
          style={styles.img}
          source={require('../../../assets/images/appLogo.png')}
        />
        <View style={styles.contentContainer}>
          <MainButton
            onPress={() => navigation.navigate(SCREENS.LOGIN as never)}
            buttonText={appLang.titlelogin}
          />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate(SCREENS.SIGNUP as never)}>
            <Text style={styles.btnText}>{appLang.signUp}</Text>
          </TouchableOpacity>
          <SocialLogins />
        </View>
      </View>
    </MainContainer>
  );
};

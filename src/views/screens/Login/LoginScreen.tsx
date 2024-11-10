import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import {
  Header,
  LoginButton,
  MainContainer,
  SocialLogins,
  UserInput,
} from '../../../components';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZE, SCREENS, STACK, TEXT_STYLE } from '../../../enums';
import { AppDataContext } from '../../../context';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme } = useContext(AppDataContext);
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxPress = () => {
    setChecked(prev => !prev);
  };
  const styles = useMemo(() => {
    return StyleSheet.create({
      contentContainer: {
        marginTop: hp(70),
      },
      checkbox: {
        width: hp(18),
        height: hp(18),
        marginRight: hp(10),
      },
      flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(20),
      },
      rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      rememberText: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.textColor,
      },
      dont: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.secondaryTextColor,
        marginRight: hp(5),
      },
      dontContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(20),
      },
      forgotPassword: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.secondaryTextColor,
      },
      register: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.primary,
      },
    });
  }, [hp, wp]);
  return (
    <MainContainer>
      <Header title="log in" />
      <View style={styles.contentContainer}>
        <UserInput label="email" />
        <UserInput label="password" />
        <View style={styles.flexContainer}>
          <View style={styles.rememberContainer}>
            <Pressable onPress={handleCheckboxPress} style={styles.checkbox}>
              {/* <AnimatedCheckbox
                checked={checked}
                highlightColor="#09CA67"
                checkmarkColor="#ffffff"
                boxOutlineColor="#09CA67"
              /> */}
            </Pressable>
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <Text
            style={styles.forgotPassword}
            onPress={() =>
              navigation.navigate(SCREENS.FORGOT_PASSWORD as never)
            }>
            Forgot Password ?
          </Text>
        </View>
        <LoginButton title="log in" onPress={() => navigation.navigate(STACK.MAIN as never)} />
        <SocialLogins />
        <View style={styles.dontContainer}>
          <Text style={styles.dont}>Don't have an account?</Text>
          <Text style={styles.register}>Register</Text>
        </View>
      </View>
    </MainContainer>
  );
};

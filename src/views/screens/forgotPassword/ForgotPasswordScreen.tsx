import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import {
  Header,
  Instructions,
  LoginButton,
  MainContainer,
  UserInput,
} from '../../../components';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../enums';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      contentContainer: {
        marginTop: hp(70),
      },
    });
  }, [hp]);
  return (
    <MainContainer>
      <Header title="forgot password" />
      <View style={styles.contentContainer}>
        <Instructions>
          Enter the email associated with your account and we’ll send an email
          with code to reset your password
        </Instructions>
        <UserInput label="email" />
        <LoginButton title="confirm" onPress={() => navigation.navigate(SCREENS.VERIFY_OTP as never)} />
      </View>
    </MainContainer>
  );
};

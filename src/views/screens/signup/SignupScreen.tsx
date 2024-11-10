import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import {
  Header,
  LoginButton,
  MainContainer,
  SocialLogins,
  UserInput,
} from '../../../components';
import { useResponsiveDimensions } from '../../../hooks';

export const SignupScreen = () => {
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
      <Header title="sign up" />
      <View style={styles.contentContainer}>
        <UserInput label="email" />
        <UserInput label="password" />
        <UserInput label="confirm password" />
        <LoginButton title="log in" onPress={() => console.warn('Pressed')} />
        <SocialLogins />
      </View>
    </MainContainer>
  );
};

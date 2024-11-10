import { StyleSheet, View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { CustomInput, Header, MainButton, MainContainer, SocialLogins } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { resetAndGo, setEmailError, setPasswordError, validateEmail, validatePassword } from '../../../utils';
import { AppDataContext } from '../../../context';
import { registerUser } from '../../../services';
import { useNavigation } from '@react-navigation/native';
import { STACK } from '../../../enums';

export const SignupScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang } = useContext(AppDataContext);
  const showToast = useToast();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [wrongEmailError, setWrongEmailError] = useState('');
  const [wrongPasswordError, setWrongPasswordError] = useState('');

  const handleSignup = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setEmailError(email, isEmailValid, appLang, setWrongEmailError);
    setPasswordError(password, isPasswordValid, appLang, setWrongPasswordError);

    if (isEmailValid && isPasswordValid) {
      setLoading(true)
      const response = await registerUser(email, password);
      if (response.success) {
        resetAndGo(navigation, STACK.MAIN, null)
        showToast(appLang.signupSuccess, 'successToast')
      } else {
        showToast(response.errorMessage, 'errorToast')
      }
      setLoading(false)
    }
  }

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
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={appLang.email}
          textWrong={wrongEmailError}
          onChange={() => setWrongEmailError('')}
          bottomError={true}
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder={appLang.password}
          textWrong={wrongPasswordError}
          onChange={() => setWrongPasswordError('')}
          bottomError={true}
          twoLinesError={true}
          secureTextEntry={true}
        />
        <MainButton
          onPress={handleSignup}
          buttonText={appLang.signUp}
          isLoading={loading}
        />
        <SocialLogins />
      </View>
    </MainContainer>
  );
};

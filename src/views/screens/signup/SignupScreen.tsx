import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { CustomInput, Header, MainButton, MainContainer, SocialLogins } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { resetAndGo, setEmailError, setNameError, setPasswordError, validateEmail, validatePassword, validateName, saveToLocal } from '../../../utils';
import { AppDataContext, useAuth } from '../../../context';
import { registerUser } from '../../../services';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZE, SCREENS, STACK, TEXT_STYLE } from '../../../enums';
import firestore from '@react-native-firebase/firestore';

export const SignupScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang } = useContext(AppDataContext);
  const showToast = useToast();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [wrongNameError, setWrongNameError] = useState('');
  const [wrongEmailError, setWrongEmailError] = useState('');
  const [wrongPasswordError, setWrongPasswordError] = useState('');
  const { login } = useAuth();

  const handleSignup = async () => {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const normalizedPassword = password.trim();
      const normalizedUserName = userName.trim();

      const isEmailValid = validateEmail(normalizedEmail);
      const isPasswordValid = validatePassword(normalizedPassword);
      const isUserNameValid = validateName(normalizedUserName);

      setEmailError(normalizedEmail, isEmailValid, appLang, setWrongEmailError);
      setPasswordError(normalizedPassword, isPasswordValid, appLang, setWrongPasswordError);
      setNameError(normalizedUserName, isUserNameValid, appLang, setWrongNameError);

      if (!isEmailValid || !isPasswordValid || !isUserNameValid) {
        return;
      }

      setLoading(true);

      const response = await registerUser(normalizedEmail, normalizedPassword);
      if (!response.success) {
        showToast(response.errorMessage, 'errorToast');
        return;
      }

      const token = response.token || '';

      await firestore().collection('users').doc(normalizedEmail).set({
        userName: normalizedUserName,
        email: normalizedEmail,
        password: normalizedPassword,
        fcmToken: '',
        createdAt: firestore.FieldValue.serverTimestamp()
      });

      login(
        normalizedUserName,
        normalizedEmail,
        token,
        '',
        '',
        '',
        ''
      );

      // resetAndGo(navigation, STACK.MAIN, null);
      resetAndGo(navigation, SCREENS.FIRSTQUESTION, null);
      showToast(appLang.signupSuccess, 'successToast');

    } catch (error) {
      console.error('Signup error:', error);
      showToast('An error occurred during signup', 'errorToast');
    } finally {
      setLoading(false);
    }
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      contentContainer: {
        marginTop: hp(90),
      },
      label: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: "capitalize",
        marginBottom: hp(3)
      },
      signupContainer: {
        marginTop: hp(40)
      }
    });
  }, [hp, wp]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <MainContainer>
        <Header title={appLang.signUp} />
        <View style={styles.contentContainer}>
          <Text style={styles.label}>{appLang.name}</Text>
          <CustomInput
            value={userName}
            setValue={setUserName}
            placeholder={appLang.textname}
            textWrong={wrongNameError}
            onChange={() => setWrongNameError('')}
            bottomError={true}
          />
          <Text style={[styles.label, { marginTop: hp(20) }]}>{appLang.email}</Text>
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder={appLang.textemail}
            textWrong={wrongEmailError}
            onChange={() => setWrongEmailError('')}
            bottomError={true}
          />
          <Text style={[styles.label, { marginTop: hp(20) }]}>{appLang.password}</Text>
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
          <View style={styles.signupContainer}>
            <MainButton
              onPress={handleSignup}
              buttonText={appLang.signUp}
              isLoading={loading}
            />
          </View>
          <SocialLogins />
        </View>
      </MainContainer>

    </KeyboardAvoidingView>
  );
};

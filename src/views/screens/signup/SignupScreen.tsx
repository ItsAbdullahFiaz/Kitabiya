import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { CustomInput, Header, MainButton, MainContainer, SocialLogins } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { resetAndGo, setEmailError, setNameError, setPasswordError, validateEmail, validatePassword, validateName, saveToLocal } from '../../../utils';
import { AppDataContext } from '../../../context';
import { registerUser } from '../../../services';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZE, STACK, TEXT_STYLE } from '../../../enums';
import firestore from '@react-native-firebase/firestore';
import { notificationService } from '../../../services/NotificationService';

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

  const handleSignup = async () => {
    try {
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);
      const isUserNameValid = validateName(userName);

      setEmailError(email, isEmailValid, appLang, setWrongEmailError);
      setPasswordError(password, isPasswordValid, appLang, setWrongPasswordError);
      setNameError(userName, isUserNameValid, appLang, setWrongNameError);

      if (!isEmailValid || !isPasswordValid || !isUserNameValid) {
        return;
      }

      setLoading(true);
      const normalizedEmail = email.toLowerCase().trim();

      const response = await registerUser(normalizedEmail, password);
      if (response.success) {
        await firestore().collection('users').doc(normalizedEmail).set({
          userName: userName.trim(),
          email: normalizedEmail,
          password,
          fcmToken: '',
          createdAt: firestore.FieldValue.serverTimestamp()
        });
        
        const permissionGranted = await notificationService.requestUserPermission();
        if (permissionGranted) {
          await notificationService.saveFCMToken(normalizedEmail);
        }

        await saveToLocal(userName.trim(), normalizedEmail, response?.token || '');
        resetAndGo(navigation, STACK.MAIN, null);
        showToast(appLang.signupSuccess, 'successToast');
      } else {
        showToast(response.errorMessage, 'errorToast');
      }
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
    <MainContainer>
      <Header title={appLang.signUp} />
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Name</Text>
        <CustomInput
          value={userName}
          setValue={setUserName}
          // placeholder={appLang.email}
          placeholder='Enter name'
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
  );
};

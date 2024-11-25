import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomInput, Header, MainButton, MainContainer, SocialLogins } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { resetAndGo, setEmailError, setPasswordError, storeStringValue, validateEmail } from '../../../utils';
import { FONT_SIZE, SCREENS, STACK, TEXT_STYLE } from '../../../enums';
import { AppDataContext } from '../../../context';
import { loginUser } from '../../../services';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationService } from '../../../services/NotificationService';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang, setAuthToken } = useContext(AppDataContext);
  const showToast = useToast();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [wrongEmailError, setWrongEmailError] = useState('');
  const [wrongPasswordError, setWrongPasswordError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Login attempt started');

      const isEmailValid = validateEmail(email);
      setEmailError(email, isEmailValid, appLang, setWrongEmailError);
      setPasswordError(password, true, appLang, setWrongPasswordError);

      if (!isEmailValid || password.trim().length === 0) {
        console.log('Validation failed:', { isEmailValid, passwordLength: password.trim().length });
        return;
      }

      setLoading(true);

      // Normalize email
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Normalized email:', normalizedEmail);
      // First check if user exists
      const userQuery = await firestore()
        .collection('users')
        .where('email', '==', normalizedEmail)
        .get();

      console.log('User query result:', { exists: !userQuery.empty });

      if (userQuery.empty) {
        console.log('No user found with this email');
        showToast('User not found', 'errorToast');
        setLoading(false);
        return;
      }

      // Get user data
      const userData = userQuery.docs[0].data();
      console.log('User data retrieved:', { userId: userData.userId });

      // Verify password
      if (userData.password !== password.trim()) {
        console.log('Password mismatch');
        showToast('Invalid password', 'errorToast');
        setLoading(false);
        return;
      }

      // Save user data to local storage with normalized email
      await saveToLocal(
        userData.userName.trim(),
        normalizedEmail,
        userData.userId
      );
      console.log('User data saved to local storage');

      // Request notification permission and save token
      try {
        const permissionGranted = await notificationService.requestUserPermission();
        if (permissionGranted) {
          await notificationService.saveFCMToken(userData.userId);
          console.log('FCM token saved');
        }
      } catch (error) {
        console.error('Notification setup error:', error);
        // Continue with login even if notification setup fails
      }

      // Proceed with login using normalized email
      const response = await loginUser(normalizedEmail, password.trim());
      console.log('Login response:', response);

      if (response.success && response.token) {
        const { token, expirationTime } = response.token;
        setAuthToken(token, expirationTime);

        console.log('Login successful, navigating...');
        resetAndGo(navigation, STACK.MAIN, null);
        showToast(appLang.loginSuccess, 'successToast');
      } else {
        console.log('Login failed:', response.errorMessage);
        showToast(response.errorMessage, 'errorToast');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('An error occurred during login', 'errorToast');
    } finally {
      setLoading(false);
    }
  };

  const saveToLocal = async (name: string, email: string, userId: string) => {
    try {
      console.log('Saving to AsyncStorage:', { name, email, userId });
      await AsyncStorage.multiSet([
        ['NAME', name.trim()],
        ['EMAIL', email],
        ['USERID', userId],
      ]);
      console.log('Successfully saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
      throw error;
    }
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      contentContainer: {
        marginTop: hp(90)
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
      },
      rememberContainer: {
        marginBottom: hp(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      rememberText: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.primaryTextColor,
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
        textAlign: "right",
        marginTop: hp(5),
      },
      register: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.link,

      },
      label: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: "capitalize",
        marginBottom: hp(3)
      },
      loginContainer: {
        marginTop: hp(30)
      }
    });
  }, [hp, wp]);

  return (
    <MainContainer>
      <Header title={appLang.titlelogin} />
      <View style={styles.contentContainer}>
        <Text style={styles.label}>{appLang.email}</Text>
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
        <Text
          style={styles.forgotPassword}
          onPress={() =>
            navigation.navigate(SCREENS.FORGOT_PASSWORD as never)
          }>
          {appLang.forgotPassword}
        </Text>
        <View style={styles.loginContainer}>
          <MainButton
            onPress={handleLogin}
            buttonText={appLang.login}
            isLoading={loading}
          />
        </View>
        <SocialLogins />
        <View style={styles.dontContainer}>
          <Text style={styles.dont}>{appLang.Dontaccount}</Text>
          <Text style={styles.register} onPress={() => navigation.navigate(SCREENS.SIGNUP as never)}>{appLang.Register}</Text>
        </View>
      </View>
    </MainContainer>
  );
};

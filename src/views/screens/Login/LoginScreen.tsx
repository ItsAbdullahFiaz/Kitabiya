import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomInput, Header, MainButton, MainContainer, SocialLogins } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { resetAndGo, saveToLocal, setEmailError, setPasswordError, validateEmail } from '../../../utils';
import { FONT_SIZE, SCREENS, STACK, TEXT_STYLE } from '../../../enums';
import { AppDataContext } from '../../../context';
import { loginUser } from '../../../services';
import firestore from '@react-native-firebase/firestore';
import { notificationService } from '../../../services/NotificationService';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang } = useContext(AppDataContext);
  const showToast = useToast();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [wrongEmailError, setWrongEmailError] = useState('');
  const [wrongPasswordError, setWrongPasswordError] = useState('');

  const handleLogin = async () => {
    try {
      const isEmailValid = validateEmail(email);
      setEmailError(email, isEmailValid, appLang, setWrongEmailError);
      setPasswordError(password, true, appLang, setWrongPasswordError);

      if (!isEmailValid || password.trim().length === 0) {
        return;
      }

      setLoading(true);
      const normalizedEmail = email.toLowerCase().trim();
      
      // Directly use Firebase Authentication
      const response = await loginUser(normalizedEmail, password.trim());
      
      if (response.success) {
        // Get user data after successful authentication
        const userQuery = await firestore()
          .collection('users')
          .where('email', '==', normalizedEmail)
          .get();
        
        const userData = userQuery.docs[0].data();
        
        // Save user data and token
        await Promise.all([
          saveToLocal(userData.userName.trim(), normalizedEmail, response.token || ''),
          notificationService.requestUserPermission()
            .then(granted => granted ? notificationService.saveFCMToken(normalizedEmail) : Promise.resolve(''))
            .catch(console.error)
        ]);

        resetAndGo(navigation, STACK.MAIN, null);
        showToast(appLang.loginSuccess, 'successToast');
      } else {
        showToast(response.errorMessage, 'errorToast');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('An error occurred during login', 'errorToast');
    } finally {
      setLoading(false);
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
     <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >

          
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
    </KeyboardAvoidingView>
  );
};

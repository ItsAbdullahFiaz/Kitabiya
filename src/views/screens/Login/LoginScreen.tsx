import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomInput, Header, MainButton, MainContainer, SocialLogins } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { resetAndGo, setEmailError, setPasswordError, validateEmail } from '../../../utils';
import { FONT_SIZE, SCREENS, STACK, TEXT_STYLE } from '../../../enums';
import { AppDataContext } from '../../../context';
import { loginUser } from '../../../services';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const isEmailValid = validateEmail(email);
    setEmailError(email, isEmailValid, appLang, setWrongEmailError);
    setPasswordError(password, true, appLang, setWrongPasswordError);
    const res=await firestore().collection('Users').where('email', '==', email).get();
    console.log("FIRESTORE_RESPONSE===>",JSON.stringify(res._docs[0].data()));
    saveToLocal(res._docs[0].data().userName,res._docs[0].data().email,res._docs[0].data().userId);
    if (isEmailValid && password.trim().length !== 0) {
      setLoading(true)
      const response = await loginUser(email, password);
      if (response.success) {
        resetAndGo(navigation, STACK.MAIN, null)
        showToast(appLang.loginSuccess, 'successToast')
      } else {
        showToast(response.errorMessage, 'errorToast')
      }
      setLoading(false)
    }
  }

  const saveToLocal=async(name:any,email:any,userId:any)=>{
    await AsyncStorage.setItem("NAME",name);
    await AsyncStorage.setItem("EMAIL",email);
    await AsyncStorage.setItem("USERID",userId);
  }
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
      loginContainer:{
        marginTop:hp(30)
      }
    });
  }, [hp, wp]);

  return (
    <MainContainer>
      <Header title="log in" />
      <View style={styles.contentContainer}>
        <Text style={styles.label}>email</Text>
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={appLang.email}
          textWrong={wrongEmailError}
          onChange={() => setWrongEmailError('')}
          bottomError={true}
        />
        <Text style={[styles.label,{marginTop:hp(20)}]}>password</Text>
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
        <Text
          style={styles.forgotPassword}
          onPress={() =>
            navigation.navigate(SCREENS.FORGOT_PASSWORD as never)
          }>
          Forgot Password?
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
          <Text style={styles.dont}>Don't have an account?</Text>
          <Text style={styles.register} onPress={() => navigation.navigate(SCREENS.SIGNUP as never)}>Register</Text>
        </View>
      </View>
    </MainContainer>
  );
};

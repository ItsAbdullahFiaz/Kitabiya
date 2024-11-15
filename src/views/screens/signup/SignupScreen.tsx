import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CustomInput, Header, MainButton, MainContainer, SocialLogins } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { resetAndGo, setEmailError,setNameError, setPasswordError, validateEmail, validatePassword,validateName } from '../../../utils';
import { AppDataContext } from '../../../context';
import { registerUser } from '../../../services';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZE, STACK, TEXT_STYLE } from '../../../enums';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const SignupScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang } = useContext(AppDataContext);
  const showToast = useToast();
  const [userName,setUserName]=useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [wrongNameError, setWrongNameError] = useState('');
  const [wrongEmailError, setWrongEmailError] = useState('');
  const [wrongPasswordError, setWrongPasswordError] = useState('');

  const handleSignup = async () => {
    const userId = uuid.v4();
    await firestore().collection("users").doc(userId).set({userName,email,password,userId});
    const res=await firestore().collection("users").where('email','==',email).get();
    saveToLocal(res._docs[0].data().userName,res._docs[0].data().email,res._docs[0].data().userId)
    console.log("SIGNUP_FIRESRORE_RES===",JSON.stringify(res._docs[0].data()));
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isUserNameValid = validateName(userName);
    setEmailError(email, isEmailValid, appLang, setWrongEmailError);
    setPasswordError(password, isPasswordValid, appLang, setWrongPasswordError);
    setNameError(userName, isUserNameValid, appLang, setWrongNameError);

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
  const saveToLocal=async(name:any,email:any,userId:any)=>{
    await AsyncStorage.setItem("NAME",name);
    await AsyncStorage.setItem("EMAIL",email);
    await AsyncStorage.setItem("USERID",userId);
  }

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
      signupContainer:{
        marginTop:hp(40)
      }
    });
  }, [hp]);
  return (
    <MainContainer>
      <Header title="sign up" />
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

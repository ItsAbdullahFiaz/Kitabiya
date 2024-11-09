import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {
  Header,
  Instructions,
  LoginButton,
  MainContainer,
} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
import {StackActions, useNavigation} from '@react-navigation/native';
import {FONT, FONT_SIZE, OTHER_COLORS, SCREENS, STACK} from '../../../enums';

export const VerifyOTP = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = Array(6)
    .fill(null)
    .map(() => useRef(null));
  const {hp, wp} = useResponsiveDimensions();

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to the next input if the text length is 1 and it's not the last input
    if (text && index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      contentContainer: {
        marginTop: hp(70),
      },
      input: {
        width: 40,
        height: 50,
        fontSize: FONT_SIZE.h2,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: OTHER_COLORS.black,
      },
      otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: hp(20),
        marginTop: hp(30),
      },
      resend: {
        fontSize: FONT_SIZE.h3,
        fontFamily: FONT.PoppinsMedium,
        fontWeight: 'regular',
        color: OTHER_COLORS.secondary,
        textAlign: 'center',
        marginTop: hp(20),
      },
    });
  }, [hp, FONT, FONT_SIZE, OTHER_COLORS]);
  return (
    <MainContainer>
      <Header title="forgot password" />
      <View style={styles.contentContainer}>
        <Instructions>
          Enter your OTP which has been sent to your email and completely verify
          your account.
        </Instructions>
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={inputs[index]}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => handleChange(text, index)}
              value={value}
            />
          ))}
        </View>
        <View style={{marginTop: 30}}>
          <Instructions textAlign="center">
            A code has been sent to your phone
          </Instructions>
          <Text style={styles.resend}>Resend in 00:57</Text>
        </View>
        <LoginButton title="confirm" onPress={()=>navigation.dispatch(StackActions.replace(STACK.MAIN as never))}/>
      </View>
    </MainContainer>
  );
};

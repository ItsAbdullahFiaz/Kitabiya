import React, { useContext, useMemo, useState } from 'react';
import { CustomInput, Header, MainButton, MainContainer, MainParagraph } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { SCREENS, TEXT_STYLE } from '../../../enums';
import { AppDataContext } from '../../../context';
import { setEmailError, validateEmail } from '../../../utils';
import { resetPassword } from '../../../services';
import { StyleSheet, Text, View } from 'react-native';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appLang, appTheme } = useContext(AppDataContext);
  const showToast = useToast();
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const [wrongEmailError, setWrongEmailError] = useState('');

  const handleResetPassword = async () => {
    const isEmailValid = validateEmail(email);
    setEmailError(email, isEmailValid, appLang, setWrongEmailError);

    if (isEmailValid) {
      setLoading(true)
      const response = await resetPassword(email);
      if (response.success) {
        navigation.navigate(SCREENS.CHECK_YOUR_EMAIL as never)
        showToast(appLang.emailSent, 'successToast')
      } else {
        showToast(response.errorMessage, 'errorToast')
      }
      setLoading(false)
    }
  }

  const styles = useMemo(() => {
    return StyleSheet.create({
      contentContainer: {
        marginTop: hp(90)
      },
      label: {
        ...TEXT_STYLE.regular,
        color: appTheme.primaryTextColor,
        textTransform: "capitalize",
        marginBottom: hp(3)
      },
      btnContainer:{
        marginTop:hp(30)
      }
    })
  }, [hp, wp])

  return (
    <MainContainer>
      <Header title="forgot password" />
      <View style={styles.contentContainer}>
        <MainParagraph paragraph={appLang.resetInstructions} />
        <Text style={styles.label}>email</Text>
        <CustomInput
          value={email}
          setValue={setEmail}
          //  placeholder={appLang.email}
           placeholder={"Text your email"}
          textWrong={wrongEmailError}
          onChange={() => setWrongEmailError('')}
          bottomError={true}
        />
        <View style={styles.btnContainer}>
        <MainButton
          onPress={handleResetPassword}
          buttonText={"confirm"}
          isLoading={loading}
        />
        </View>
      </View>
    </MainContainer>
  );
};

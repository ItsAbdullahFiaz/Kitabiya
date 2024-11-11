import React, { useContext, useState } from 'react';
import { CustomInput, Header, MainButton, MainContainer, MainHeading, MainParagraph } from '../../../components';
import { useResponsiveDimensions, useToast } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../enums';
import { AppDataContext } from '../../../context';
import { setEmailError, validateEmail } from '../../../utils';
import { resetPassword } from '../../../services';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const { appLang } = useContext(AppDataContext);
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

  return (
    <MainContainer>
      <Header title="forgot password" />
      <MainHeading heading={appLang.resetPassword} />
      <MainParagraph paragraph={appLang.resetInstructions} />
      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder={appLang.email}
        textWrong={wrongEmailError}
        onChange={() => setWrongEmailError('')}
        bottomError={true}
      />
      <MainButton
        onPress={handleResetPassword}
        buttonText={appLang.sendInstructions}
        isLoading={loading}
      />
    </MainContainer>
  );
};

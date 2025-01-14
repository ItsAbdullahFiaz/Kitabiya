import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationHandler } from './NavigationHandler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS, STACK } from '../enums';
import { AuthStack, MainStack, OnboardingStack } from '.';
import {
  AddScreen,
  MyBooksScreen,
  Notification,
  Popular,
  PrivacyPolicyScreen,
  SplashScreen,
} from '../views/screens';
import { ProfileScreen } from '../views/screens/profile';
import { HelpCenter } from '../views/screens/helpcenter';
import { FirstQuestion, FourthQuestion, SecondQuestion, ThirdQuestion } from '../views/screens/questionaire';
import { UserDetails } from '../views/screens/userDetails';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <NavigationHandler />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
        <Stack.Screen name={STACK.ONBOARDING} component={OnboardingStack} />
        <Stack.Screen name={STACK.AUTH} component={AuthStack} />
        <Stack.Screen name={STACK.MAIN} component={MainStack} />
        <Stack.Screen name={SCREENS.NOTIFICATION} component={Notification} />
        <Stack.Screen name={SCREENS.MY_BOOK} component={MyBooksScreen} />
        <Stack.Screen name={SCREENS.POPULAR} component={Popular} />
        <Stack.Screen name={SCREENS.ADD_SCREEN} component={AddScreen} />
        <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={SCREENS.PRIVACY_POLICY} component={PrivacyPolicyScreen} />
        <Stack.Screen name={SCREENS.HELP_CENTER} component={HelpCenter} />
        <Stack.Screen name={SCREENS.FIRSTQUESTION} component={FirstQuestion} />
        <Stack.Screen name={SCREENS.SECONDQUESTION} component={SecondQuestion} />
        <Stack.Screen name={SCREENS.THIRDQUESTION} component={ThirdQuestion} />
        <Stack.Screen name={SCREENS.FOURTHQUESTION} component={FourthQuestion} />
        <Stack.Screen name={SCREENS.USERDETAILS} component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

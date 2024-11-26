import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationHandler} from './NavigationHandler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS, STACK} from '../enums';
import {AuthStack, MainStack, OnboardingStack} from '.';
import {
  AddScreen,
  MyBooksScreen,
  Notification,
  Popular,
  SplashScreen,
} from '../views/screens';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <NavigationHandler />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
        <Stack.Screen name={STACK.ONBOARDING} component={OnboardingStack} />
        <Stack.Screen name={STACK.AUTH} component={AuthStack} />
        <Stack.Screen name={STACK.MAIN} component={MainStack} />
        <Stack.Screen name={SCREENS.NOTIFICATION} component={Notification} />
        <Stack.Screen name={SCREENS.MY_BOOK} component={MyBooksScreen} />
        <Stack.Screen name={SCREENS.POPULAR} component={Popular} />
        <Stack.Screen name={SCREENS.ADD_SCREEN} component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

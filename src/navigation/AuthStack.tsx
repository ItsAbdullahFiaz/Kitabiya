import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../enums';
import { CheckYourEmailScreen, ForgotPasswordScreen, LoginScreen, SignupScreen, WelcomeScreen } from '../views/screens';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
            <Stack.Screen name={SCREENS.SIGNUP} component={SignupScreen} />
            <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
            <Stack.Screen name={SCREENS.CHECK_YOUR_EMAIL} component={CheckYourEmailScreen} />
        </Stack.Navigator>
    )
}
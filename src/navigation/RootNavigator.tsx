import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS, STACK } from '../enums';
import { MainStack } from '.';
import { SplashScreen } from '../views/screens';
import { GetStarted } from '../views/screens/getStarted';
import { Welcome } from '../views/screens/welcome';
import { Login } from '../views/screens/Login';
import { Signup } from '../views/screens/signup';
import { ForgotPassword } from '../views/screens/forgotPassword';
import { VerifyOTP } from '../views/screens/verifyOTP';
import { Search } from '../views/screens/search';
import { Audio } from '../views/screens/audio/Audio';
import { BookDetail } from '../views/screens/bookDetail';
import { Favourites } from '../views/screens/favourites';
import { AddScreen } from '../views/screens/add';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
                <Stack.Screen name={SCREENS.GET_STARTED} component={GetStarted} />
                <Stack.Screen name={SCREENS.WELCOME} component={Welcome} />
                <Stack.Screen name={SCREENS.LOGIN} component={Login} />
                <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
                <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPassword} />
                <Stack.Screen name={SCREENS.VERIFY_OTP} component={VerifyOTP} />
                <Stack.Screen name={STACK.MAIN} component={MainStack} />
                <Stack.Screen name={SCREENS.SEARCH} component={Search} />
                <Stack.Screen name={SCREENS.AUDIO} component={Audio} />
                <Stack.Screen name={SCREENS.BOOK_DETAIL} component={BookDetail} />
                <Stack.Screen name={SCREENS.FAVOURITES} component={Favourites} />
                <Stack.Screen name={SCREENS.ADD_SCREEN} component={AddScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
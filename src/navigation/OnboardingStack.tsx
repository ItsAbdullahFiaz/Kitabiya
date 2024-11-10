import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../enums';
import { GetStartedScreen } from '../views/screens';

const Stack = createNativeStackNavigator();

export const OnboardingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.GET_STARTED} component={GetStartedScreen} />
        </Stack.Navigator>
    )
}
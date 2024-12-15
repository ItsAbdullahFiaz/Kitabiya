import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS, STACK } from '../enums';
import BottomStack from './BottomStack';
import { AudioScreen, BookDetailScreen, SearchScreen } from '../views/screens';
import { Chat } from '../views/screens/chat';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={STACK.BOTTOM} component={BottomStack} />
            <Stack.Screen name={SCREENS.SEARCH} component={SearchScreen} />
            <Stack.Screen name={SCREENS.AUDIO} component={AudioScreen} />
            <Stack.Screen name={SCREENS.BOOK_DETAIL} component={BookDetailScreen} />
            <Stack.Screen name={SCREENS.CHAT} component={Chat} />
        </Stack.Navigator>
    )
}

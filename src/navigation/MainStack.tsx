import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS, STACK } from '../enums';
import BottomStack from './BottomStack';
import { AddScreen, AudioScreen, BookDetailScreen, FavouritesScreen, SearchScreen } from '../views/screens';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={STACK.BOTTOM} component={BottomStack} />
            <Stack.Screen name={SCREENS.SEARCH} component={SearchScreen} />
            <Stack.Screen name={SCREENS.AUDIO} component={AudioScreen} />
            <Stack.Screen name={SCREENS.BOOK_DETAIL} component={BookDetailScreen} />
            <Stack.Screen name={SCREENS.FAVOURITES} component={FavouritesScreen} />
            <Stack.Screen name={SCREENS.ADD_SCREEN} component={AddScreen} />
        </Stack.Navigator>
    )
}

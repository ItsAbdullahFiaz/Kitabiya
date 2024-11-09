import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SCREENS } from '../enums';
import { HomeScreen, PrivacyPolicy, Terms } from '../views/screens';
import { CustomDrawer } from '../components';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name={SCREENS.HOME} component={HomeScreen} />
            <Drawer.Screen name={SCREENS.PRIVACY_POLICY} component={PrivacyPolicy} />
            <Drawer.Screen name={SCREENS.TERMS} component={Terms} />
        </Drawer.Navigator>
    )
}

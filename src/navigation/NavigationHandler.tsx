import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import notifee, { EventType } from '@notifee/react-native';
import { SCREENS } from '../enums';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NavigationHandler = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        // Check for initial notification data
        const checkInitialNotification = async () => {
            const initialNotificationData = await AsyncStorage.getItem('initialNotification');
            if (initialNotificationData) {
                const data = JSON.parse(initialNotificationData);
                handleNotificationPress({ data });
                // Clear the stored notification data
                await AsyncStorage.removeItem('initialNotification');
            }
        };

        checkInitialNotification();

        // Handle foreground notification presses
        const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.PRESS) {
                handleNotificationPress(detail.notification);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleNotificationPress = (notification: any) => {
        if (notification?.data) {
            const { type, id, userId } = notification.data;

            if (type === 'chat') {
                navigation.navigate(SCREENS.CHAT, {
                    id,
                    data: {
                        userId
                    }
                });
            }
        }
    };

    return null;
};

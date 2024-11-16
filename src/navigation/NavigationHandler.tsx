import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import notifee, { EventType } from '@notifee/react-native';

export const NavigationHandler = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
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
        if (notification?.data?.screen) {
            navigation.navigate(notification.data.screen);
        }
    };

    return null;
};

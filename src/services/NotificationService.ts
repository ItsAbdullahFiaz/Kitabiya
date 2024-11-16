import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';

class NotificationService {
    async requestUserPermission() {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const authStatus = await messaging().requestPermission();
                return (
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL
                );
            }
        } catch (error) {
            console.log('Error requesting notification permission:', error);
            return false;
        }
    }

    async getFCMToken() {
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);
        return fcmToken;
    }

    onTokenRefresh() {
        return messaging().onTokenRefresh(token => {
            console.log('New token:', token);
            // Here you can send the token to your server
        });

    }

    // Create notification channel for Android
    async createDefaultChannel() {
        if (Platform.OS === 'android') {
            await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC,
                vibration: true,
                lights: true,
            });
        }
    }

    // Display foreground notification using Notifee
    async displayNotification(title: string, body: string, data?: any) {
        await notifee.displayNotification({
            title,
            body,
            data,
            android: {
                channelId: 'default',
                pressAction: {
                    id: 'default',
                },
            },
        });
    }
}

export const notificationService = new NotificationService();
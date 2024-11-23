import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';

class NotificationService {
    async requestUserPermission() {
        try {
            if (Platform.OS === 'android') {
                if (Platform.Version >= 33) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                    )
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                } else {
                    return true;
                }
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

    async displayChatNotification(title: string, body: string, chatData: any) {
        await notifee.displayNotification({
            title,
            body,
            data: {
                type: 'chat',
                id: chatData.senderId,
                userId: chatData.receiverId,
                screen: 'CHAT'
            },
            android: {
                channelId: 'default',
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    async saveFCMToken(userId: string) {
        try {
            const token = await messaging().getToken();
            console.log('Saving FCM token:', token, 'for user:', userId);

            await firestore()
                .collection('users')
                .doc(userId)
                .update({
                    fcmToken: token,
                });

            // Set up token refresh listener
            messaging().onTokenRefresh(async (newToken) => {
                await firestore()
                    .collection('users')
                    .doc(userId)
                    .update({
                        fcmToken: newToken,
                    });
            });

            return token;
        } catch (error) {
            console.error('Error saving FCM token:', error);
            throw error;
        }
    }
}

export const notificationService = new NotificationService();
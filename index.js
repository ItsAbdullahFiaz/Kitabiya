/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { AppDataProvider } from './src/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/context/AuthContext';

const MainApp = () => (
    <AppDataProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </AppDataProvider>
);

// Register background handler for Firebase messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    if (remoteMessage.data?.type === 'chat') {
        await notifee.displayNotification({
            title: remoteMessage.notification?.title || 'New Message',
            body: remoteMessage.notification?.body || '',
            data: {
                type: 'chat',
                id: remoteMessage.data.senderId,
                userId: remoteMessage.data.receiverId,
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
});

// Handle background notification press events
notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
        const { notification } = detail;

        // Store the notification data to be handled when app opens
        if (notification?.data?.type === 'chat') {
            await AsyncStorage.setItem('initialNotification', JSON.stringify(notification.data));
        }
    }
});

AppRegistry.registerComponent(appName, () => MainApp);

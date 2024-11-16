/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { AppDataProvider } from './src/context';

const MainApp = () => (
    <AppDataProvider>
        <App />
    </AppDataProvider>
);

// Register background handler for Firebase messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    if (!remoteMessage.notification) {
        await notifee.displayNotification({
            title: remoteMessage.data?.title,
            body: remoteMessage.data?.body,
            data: remoteMessage.data,
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
        console.log('User pressed notification in background', detail.notification);
    }
});

AppRegistry.registerComponent(appName, () => MainApp);

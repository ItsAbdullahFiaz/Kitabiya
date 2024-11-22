import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useMemo } from 'react'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidStyle } from '@notifee/react-native';
import { RootNavigator } from './navigation';
import { LeaderboardToast } from './components';
import { AppDataContext } from './context';
import { useResponsiveDimensions } from './hooks';
import { notificationService } from './services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subscribeToTopics, unsubscribeFromTopics } from './utils/notifications';

export default function App() {
  const { appTheme } = useContext(AppDataContext);
  const { wp, hp } = useResponsiveDimensions();

  useEffect(() => {
    const setup = async () => {
      // Create default notification channel
      await notificationService.createDefaultChannel();

      // Check for initial notification (app opened from quit state)
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification?.notification?.data?.type === 'chat') {
        // Store this information somewhere to be used after navigation is ready
        // You can use global state management (Redux/Context) or AsyncStorage
        await AsyncStorage.setItem('initialNotification', JSON.stringify(initialNotification.notification.data));
      }
    };

    setup();

    // Handle foreground messages from Firebase
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      if (remoteMessage.data?.type === 'chat') {
        await notificationService.displayChatNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || '',
          {
            senderId: remoteMessage.data.senderId,
            receiverId: remoteMessage.data.receiverId
          }
        );
      } else {
        await notificationService.displayNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || ''
        );
      }
    });

    // Subscribe when app starts
    subscribeToTopics();

    return () => {
      unsubscribeForeground();
      // Unsubscribe when app is closed (optional)
      unsubscribeFromTopics();
    };
  }, []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: appTheme.primaryBackground
      },
    });
  }, [hp, wp, appTheme]);

  const toastConfig = {
    successToast: ({ text1, text2 }: { text1: string, text2: string }) => (
      <LeaderboardToast text1={text1} text2={text2} type="successLeaderboard" />
    ),
    errorToast: ({ text1, text2 }: { text1: string, text2: string }) => (
      <LeaderboardToast text1={text1} text2={text2} type="errorLeaderboard" />
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={appTheme.primary == '#1b2c3d' ? 'dark-content' : 'light-content'} backgroundColor={appTheme.primaryBackground} />
      <RootNavigator />
      <Toast config={toastConfig} />
    </SafeAreaView>
  )
}

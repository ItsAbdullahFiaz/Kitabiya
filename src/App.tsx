import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { RootNavigator } from './navigation';
import { LeaderboardToast } from './components';
import { useResponsiveDimensions } from './hooks';
import { notificationService } from './services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subscribeToTopics, unsubscribeFromTopics } from './utils/notifications';
import firestore from '@react-native-firebase/firestore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
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
        await AsyncStorage.setItem(
          'initialNotification',
          JSON.stringify(initialNotification.notification.data),
        );
      }
    };

    setup();

    // Handle foreground messages from Firebase
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      const incomingUserData = await firestore()
        .collection('users')
        .doc(remoteMessage?.data?.senderId)
        .get();
      // console.log('RANA_ADEEL===>', incomingUserData?.data()?.userName);
      console.log('RANA_ADEEL_FullData===>', incomingUserData?.data());
      const existingData = await AsyncStorage.getItem('MESSAGE_LIST');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const newData = [...parsedData, { email: incomingUserData?.data()?.email, userName: incomingUserData?.data()?.userName }];
      await AsyncStorage.setItem('MESSAGE_LIST', JSON.stringify(newData));
      const data = {
        email: remoteMessage?.data?.senderId,
        userName: incomingUserData?.data()?.userName,
      };
      await AsyncStorage.setItem('SENDER_OBJECT', JSON.stringify(data));
      if (remoteMessage.data?.type === 'chat') {
        await notificationService.displayChatNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || '',
          {
            senderId: remoteMessage.data.senderId,
            receiverId: remoteMessage.data.receiverId,
          },
        );
      } else {
        await notificationService.displayNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || '',
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
      },
    });
  }, [hp, wp]);

  const toastConfig = {
    successToast: ({ text1, text2 }: { text1?: string; text2?: string }) => (
      <LeaderboardToast
        text1={text1 || ''}
        text2={text2 || ''}
        type="successLeaderboard"
      />
    ),
    errorToast: ({ text1, text2 }: { text1?: string; text2?: string }) => (
      <LeaderboardToast
        text1={text1 || ''}
        text2={text2 || ''}
        type="errorLeaderboard"
      />
    ),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
        <Toast config={toastConfig} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

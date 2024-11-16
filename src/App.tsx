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

export default function App() {
  const { appTheme } = useContext(AppDataContext);
  const { wp, hp } = useResponsiveDimensions();

  useEffect(() => {
    // Create default notification channel
    notificationService.createDefaultChannel();

    // Handle foreground messages from Firebase
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);

      if (remoteMessage?.notification) {
        // For notification messages, create a Notifee notification
        await notifee.displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          data: remoteMessage.data,
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
            style: {
              type: AndroidStyle.BIGTEXT,
              text: remoteMessage.notification.body || ''
            },
          },
        });
      }
    });

    // Set up Notifee foreground event handler
    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeNotifee();
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

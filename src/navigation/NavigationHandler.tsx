import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import notifee, { EventType } from '@notifee/react-native';
import { SCREENS } from '../enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export const NavigationHandler = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Check for initial notification data
    const checkInitialNotification = async () => {
      const initialNotificationData = await AsyncStorage.getItem(
        'initialNotification',
      );
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

  const handleNotificationPress = async (notification: any) => {
    const incomingUserData = await firestore()
      .collection('users')
      .doc(notification?.data?.id)
      .get();
    if (notification?.data) {
      const { type, id, userId } = notification.data;
      // const existingData = await AsyncStorage.getItem('MESSAGE_LIST');
      // const parsedData = existingData ? JSON.parse(existingData) : [];
      // const newData = [...parsedData, { email: id, userName: incomingUserData?.data()?.userName }];
      // await AsyncStorage.setItem('MESSAGE_LIST', JSON.stringify(newData));
      // console.log(`Email is : ${id} and userName is : ${incomingUserData?.data()?.userName}`);
      // console.log("INCOMING_USER_NAME===>", JSON.stringify(incomingUserData));
      if (type === 'chat') {
        navigation.navigate(SCREENS.CHAT, {
          data: {
            email: id,
            userName: incomingUserData?.data()?.userName,
          },
          emailId: userId,
        });
      }
    }
  };

  return null;
};

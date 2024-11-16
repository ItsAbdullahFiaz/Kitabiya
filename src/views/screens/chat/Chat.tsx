import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Header, MainContainer } from '../../../components';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { notificationService } from '../../../services/NotificationService';

export const Chat = ({ route }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [receiverToken, setReceiverToken] = useState<string>('');

  // Fetch receiver's FCM token
  useEffect(() => {
    const getReceiverToken = async () => {
      const userDoc = await firestore()
        .collection('users')
        .doc(route.params.data.userId)
        .get();

      if (userDoc.exists) {
        setReceiverToken(userDoc.data()?.fcmToken || '');
      }
    };

    getReceiverToken();
  }, [route.params.data.userId]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + '-' + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMessages = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: {
            _id: doc.data().user._id,
            name: doc.data().user.name,
            avatar: doc.data().user.avatar,
          },
        }));
        setMessages(allMessages);
      });
    return () => subscriber();
  }, [route.params.id, route.params.data.userId]);

  const sendNotification = async (messageText: string) => {
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Replace with your Firebase Server Key
          'Authorization': 'key=YOUR_FIREBASE_SERVER_KEY'
        },
        body: JSON.stringify({
          to: receiverToken,
          notification: {
            title: route.params.data.userName || 'New Message',
            body: messageText,
          },
          data: {
            type: 'chat',
            senderId: route.params.id,
            receiverId: route.params.data.userId,
            screen: 'CHAT'
          },
        }),
      });

      console.log('Notification sent:', await response.json());
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: new Date(),
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

    // Save message to both users' chat collections
    await firestore()
      .collection('chats')
      .doc(route.params.id + '-' + route.params.data.userId)
      .collection('messages')
      .add(myMsg);

    await firestore()
      .collection('chats')
      .doc(route.params.data.userId + '-' + route.params.id)
      .collection('messages')
      .add(myMsg);

    // Send notification to receiver
    if (receiverToken) {
      await sendNotification(msg.text);
    }
  }, [route.params.id, route.params.data.userId, receiverToken]);

  return (
    <MainContainer>
      <Header title="chat" />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </MainContainer>
  );
};
const styles = StyleSheet.create({});
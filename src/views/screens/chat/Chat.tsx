import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Header, MainContainer } from '../../../components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { apiService } from '../../../services/api';

export const Chat = ({ route }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [receiverToken, setReceiverToken] = useState<string>('');

  // Fetch receiver's FCM token
  useEffect(() => {
    const getReceiverToken = async () => {
      try {
        // Get receiver's token from Firestore
        const userDoc = await firestore()
          .collection('users')
          .doc(route.params.data.userId)
          .get();

        if (userDoc.exists) {
          const token = userDoc.data()?.fcmToken;
          console.log('Receiver token:', token);
          setReceiverToken(token || '');
        }
      } catch (error) {
        console.error('Error fetching receiver token:', error);
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
      const notificationData = {
        token: receiverToken,
        title: route.params.data.userName || 'New Message',
        body: messageText,
        data: {
          type: 'chat',
          senderId: route.params.id,
          receiverId: route.params.data.userId,
          screen: 'CHAT'
        }
      };

      const response = await apiService.sendNotification(notificationData);

      if (response.error) {
        if (response.code === 'messaging/registration-token-not-registered') {
          // Remove invalid token from database
          await firestore()
            .collection('users')
            .doc(route.params.data.userId)
            .update({
              fcmToken: firestore.FieldValue.delete(),
            });
        }
        throw new Error(response.message || 'Failed to send notification');
      }

      console.log('Notification sent:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  };

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: new Date(),
    };

    setMessages((previousMessages: IMessage[]) =>
      GiftedChat.append(previousMessages, [myMsg])
    );

    try {
      // Save message to both users' chat collections
      await Promise.all([
        firestore()
          .collection('chats')
          .doc(`${route.params.id}-${route.params.data.userId}`)
          .collection('messages')
          .add(myMsg),

        firestore()
          .collection('chats')
          .doc(`${route.params.data.userId}-${route.params.id}`)
          .collection('messages')
          .add(myMsg)
      ]);

      // Send notification to receiver
      if (receiverToken) {
        await sendNotification(msg.text);
      }
    } catch (error) {
      console.error('Error in onSend:', error);
      // You might want to show an error toast here
    }
  }, [route.params.id, route.params.data.userId, receiverToken]);

  return (
    <MainContainer>
      <Header title="chat" />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages as any)}
        user={{
          _id: route.params.id,
        }}
      />
    </MainContainer>
  );
};
const styles = StyleSheet.create({});
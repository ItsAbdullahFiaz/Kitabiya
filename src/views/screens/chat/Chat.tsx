import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Header, MainContainer } from '../../../components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { NOTIFICATION_SERVER_URL } from '../../../config';

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
      const url = `${NOTIFICATION_SERVER_URL}/notifications/send`;
      console.log('Sending notification to:', url);

      const requestData = {
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

      console.log('Request data:', requestData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.code === 'messaging/registration-token-not-registered') {
          // Remove invalid token from database
          await firestore()
            .collection('users')
            .doc(route.params.data.userId)
            .update({
              fcmToken: firestore.FieldValue.delete(),
            });
        }
        throw new Error(errorData.error || 'Failed to send notification');
      }

      const result = await response.json();
      console.log('Notification sent:', result);
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

    setMessages((previousMessages: IMessage[]) => GiftedChat.append(previousMessages, [myMsg]));

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
        onSend={messages => onSend(messages as any)}
        user={{
          _id: route.params.id,
        }}
      />
    </MainContainer>
  );
};
const styles = StyleSheet.create({});
import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Header, MainContainer } from '../../../components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useResponsiveDimensions } from '../../../hooks';
import { FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../enums';
import { AppDataContext } from '../../../context';
import { apiService } from '../../../services/api';

export const Chat = ({ route }: any) => {
  const { appTheme } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
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

  const styles = useMemo(() => {
    return StyleSheet.create({
      headerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: appTheme.borderDefault,
        paddingBottom: hp(20)
      },
      imgContainer: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: OTHER_COLORS.green
      },
      img: {
        height: hp(48),
        width: hp(48),
        borderRadius: hp(24)
      },
      userName: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.secondaryTextColor
      },
      status: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: OTHER_COLORS.green
      },
      greenDot: {
        height: hp(10),
        width: hp(10),
        borderRadius: hp(5),
        backgroundColor: OTHER_COLORS.green,
        position: "absolute",
        top: hp(5),
        right: hp(0),
        zIndex: 1
      },
      textContainer: {
        marginLeft: hp(15)
      }
    });
  }, [])
  return (
    <MainContainer>
      {/* <Header title="chat" /> */}
      <View style={styles.headerContainer}>
        <View style={styles.imgContainer}>
          <View style={styles.greenDot}></View>
          <Image style={styles.img} resizeMode={"cover"} source={require("../../../assets/images/user.png")} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{route?.params?.data.userName}</Text>
          <Text style={styles.status}>online</Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages as any)}
        user={{
          _id: route.params.id,
        }}
        textInputStyle={{
          color: appTheme.secondaryTextColor,
        }}
      />
    </MainContainer>
  );
};
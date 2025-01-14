import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BackButton, MainContainer } from '../../../components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useResponsiveDimensions } from '../../../hooks';
import { FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE } from '../../../enums';
import { AppDataContext } from '../../../context';
import { apiService } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getColorByFirstLetter } from '../../../utils';
import UserAvatar from 'react-native-user-avatar';
import { useNavigation } from '@react-navigation/native';

export const Chat = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const userDetails = route?.params?.data;
  console.log('CHAT_ROUTE_DATA===>', route?.params?.data);
  const { appTheme } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const [messages, setMessages] = useState<any>([]);
  const [senderDetails, setSenderDetails] = useState<any>('');
  const [receiverToken, setReceiverToken] = useState<string>('');

  const saveUserData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('MESSAGE_LIST');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const newData = [...parsedData, route?.params?.data];
      await AsyncStorage.setItem('MESSAGE_LIST', JSON.stringify(newData));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getSenderDetail = async () => {
    try {
      const res = await AsyncStorage.getItem('SENDER_OBJECT');
      const result = JSON.parse(res);
      console.log('IRFAN_FAIZI===>', result);
      setSenderDetails(result);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getSenderDetail();
  }, []);

  useEffect(() => {
    saveUserData();
  }, []);

  useEffect(() => {
    const getReceiverToken = async () => {
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(route.params.data.email)
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
  }, [route.params.data.email]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(
        route.params.emailId + '-' + route.params.data.email ||
        senderDetails.data.senderId,
      )
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
        console.log('ALL_INCOMING_MESSAGES===>', allMessages);
        setMessages(allMessages);
      });
    return () => subscriber();
  }, [route.params.emailId, route.params.data.email]);

  const sendNotification = async (messageText: string) => {
    try {
      const notificationData = {
        token: receiverToken,
        title: route.params.data.userName || 'New Message',
        body: messageText,
        data: {
          type: 'chat',
          senderId: route.params.emailId,
          receiverId: route.params.data.email,
          screen: 'CHAT',
        },
      };

      const response = await apiService.sendNotification(notificationData);

      if (response.error) {
        if (response.code === 'messaging/registration-token-not-registered') {
          await firestore()
            .collection('users')
            .doc(route.params.data.email)
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
          stack: error.stack,
        });
      }
    }
  };

  const onSend = useCallback(
    async (messages: IMessage[] = []) => {
      const msg = messages[0];
      const myMsg = {
        ...msg,
        sendBy: route.params.emailId,
        sendTo: route.params.data.email,
        createdAt: new Date(),
      };

      setMessages((previousMessages: IMessage[]) =>
        GiftedChat.append(previousMessages, [myMsg]),
      );

      try {
        await Promise.all([
          firestore()
            .collection('chats')
            .doc(`${route.params.emailId}-${route.params.data.email}`)
            .collection('messages')
            .add(myMsg),

          firestore()
            .collection('chats')
            .doc(`${route.params.data.email}-${route.params.emailId}`)
            .collection('messages')
            .add(myMsg),
        ]);
        if (receiverToken) {
          await sendNotification(msg.text);
        }
      } catch (error) {
        console.error('Error in onSend:', error);
      }
    },
    [route.params.emailId, route.params.data.email, receiverToken],
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: appTheme.borderDefault,
        paddingBottom: hp(20),
      },
      imgContainer: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: OTHER_COLORS.green,
        marginLeft: hp(20),
      },
      img: {
        height: hp(48),
        width: hp(48),
        borderRadius: hp(24),
      },
      userName: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.secondaryTextColor,
      },
      status: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: OTHER_COLORS.green,
      },
      greenDot: {
        height: hp(10),
        width: hp(10),
        borderRadius: hp(5),
        backgroundColor: OTHER_COLORS.green,
        position: 'absolute',
        top: hp(5),
        right: hp(0),
        zIndex: 1,
      },
      textContainer: {
        marginLeft: hp(15),
      },
    });
  }, []);

  return (
    <MainContainer>
      <View style={styles.headerContainer}>
        <BackButton />
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate(SCREENS.USERDETAILS as never, { userDetails })}>
          <View style={styles.imgContainer}>
            <View style={styles.greenDot}></View>
            <UserAvatar
              style={styles.img}
              size={50}
              name={route?.params?.data.userName}
              bgColor={getColorByFirstLetter(route?.params?.data.userName)}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{route?.params?.data.userName}</Text>
            <Text style={styles.status}>online</Text>
          </View>
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages as any)}
        user={{
          _id: route.params.emailId,
        }}
        textInputStyle={{
          color: appTheme.secondaryTextColor,
        }}
      />
    </MainContainer>
  );
};

import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Header, MainContainer} from '../../../components';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

export const Chat = ({route}: any) => {
  console.log('DATA_ON_CHAT===>', route?.params);
  const [messages, setMessages] = useState<any>([]);

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

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc(route.params.id + '-' + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc(route.params.data.userId + '-' + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, [route.params.id, route.params.data.userId]);
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
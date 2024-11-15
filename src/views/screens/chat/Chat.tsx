import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Header, MainContainer } from '../../../components'
import { GiftedChat } from 'react-native-gifted-chat'

export const Chat = () => {
    const [messages, setMessages] = useState<any>([]);
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )
      }, [])
  return (
    <MainContainer>
        <Header title="chat"/>
        <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </MainContainer>
  )
}
const styles = StyleSheet.create({})

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export const Chat = () => {
//   return (
//     <View>
//       <Text>Chat</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})
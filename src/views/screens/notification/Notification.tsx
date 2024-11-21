import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { Header, MainContainer } from '../../../components'
import { NotificationComponent } from './component'
import { notificationData } from '../../../utils'

export const Notification = () => {
  return (
    <MainContainer>
      <Header title="notifications"/>
      <View style={styles.listContainer}>
        <FlatList
        data={notificationData}
        renderItem={({item})=>{
          const {id,title,opportunities,image}=item;
          return (
            <NotificationComponent id={id} title={title} opportunities={opportunities} image={image}/>
          )
        }}
        />
      </View>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  listContainer:{}
})
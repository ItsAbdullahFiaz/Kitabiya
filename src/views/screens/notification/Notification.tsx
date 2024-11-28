import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, MainContainer} from '../../../components';
import {NotificationComponent} from './component';
import {notificationData} from '../../../utils';
import {SkeletonLoader} from '../../../components';

export const Notification = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <MainContainer>
      <Header title="notifications" />
      <View style={styles.listContainer}>
        {loading ? (
          <FlatList
            data={Array.from({length: 5})}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => (
              <View style={{marginVertical: 5}}>
                <SkeletonLoader width="100%" height={79} borderRadius={14} />
              </View>
            )}
          />
        ) : (
          <FlatList
            data={notificationData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              const {id, title, opportunities, image} = item;
              return (
                <NotificationComponent
                  id={id}
                  title={title}
                  opportunities={opportunities}
                  image={image}
                />
              );
            }}
          />
        )}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
  },
});

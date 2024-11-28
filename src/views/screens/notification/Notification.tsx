import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, MainContainer} from '../../../components';
import {NotificationComponent} from './component';
import {apiService} from '../../../services/api';
import {useToast} from '../../../hooks';

interface NotificationItem {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  data: {
    type: 'system' | string;
    action?: string;
  };
}

export const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await apiService.getNotificationsList();

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch notifications');
      }

      setNotifications(response.data.broadcasts || []);
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      showToast(error.message, 'errorToast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <MainContainer>
      <Header title="notifications" />
      <View style={styles.listContainer}>
        <FlatList
          data={notifications}
          renderItem={({item}) => {
            const {_id, title, body, createdAt, data} = item;
            return (
              <NotificationComponent
                id={_id}
                title={title}
                opportunities={body}
                image={
                  data.type === 'system'
                    ? require('../../../assets/images/bellIcon.png')
                    : undefined
                }
                timestamp={createdAt}
                type={data.type}
                action={data.action}
              />
            );
          }}
          refreshing={loading}
          onRefresh={fetchNotifications}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
});

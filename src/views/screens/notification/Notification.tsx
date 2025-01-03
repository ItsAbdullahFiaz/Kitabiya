import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Header, MainContainer} from '../../../components';
import {NotificationComponent} from './component';
import {apiService} from '../../../services/api';
import {useResponsiveDimensions, useToast} from '../../../hooks';
import {SkeletonLoader} from '../../../components';
import {AppDataContext} from '../../../context';
import {FONT_SIZE, TEXT_STYLE} from '../../../enums';

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
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  const fetchNotifications = async () => {
    try {
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

  const styles = useMemo(() => {
    return StyleSheet.create({
      listContainer: {},
      skeletonPlaceholder: {},
      noNotifation: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h2),
        color: appTheme.primaryTextColor,
      },
      container: {
        backgroundColor: appTheme.primaryBackground,
        height: hp(100),
        width: '92%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: appTheme.borderDefault,
        borderRadius: hp(14),
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 16,

        margin: hp(15),
      },
      row: {
        width: hp(352),
        height: hp(47),
        flexDirection: 'row',
      },
      iconWrapper: {
        width: hp(50),
        height: hp(40),
        justifyContent: 'center',
        alignItems: 'center',
      },
      textWrapper: {
        width: hp(290),
        height: hp(47),
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        height: hp(30),
        width: hp(290),
        padding: 2,
      },
      subtitle: {
        height: hp(40),
        width: hp(290),
        padding: 2,
      },
      outerCircle: {
        width: hp(40),
        height: hp(40),
        backgroundColor: appTheme.secondaryBackground,
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: hp(20),
        borderColor: appTheme.primaryBackground,
        borderWidth: 1,
      },
      innerCircle: {
        width: hp(40),
        height: hp(40),
        backgroundColor: appTheme.secondaryBackground,
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp(10),
        borderColor: appTheme.primaryBackground,
        borderWidth: 0.5,
      },
      icon: {width: hp(20), height: hp(20), padding: 2},
    });
  }, [hp, wp, appTheme]);

  if (loading) {
    return Array.from({length: 5}).map((_, index) => (
      <View style={styles.container} key={index}>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.innerCircle}>
              <View style={styles.outerCircle}>
                <View style={styles.icon}>
                  <SkeletonLoader
                    key={index}
                    width="100%"
                    height={'100%'}
                    borderRadius={50}
                    // style={styles.skeletonPlaceholder}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <View style={styles.title}>
              <SkeletonLoader key={index} width="100%" height={'100%'} />
            </View>
            <View style={styles.subtitle}>
              <SkeletonLoader key={index} width="100%" height={'100%'} />
            </View>
          </View>
        </View>
      </View>
    ));
  }

  if (!loading && notifications.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.noNotifation}>No Notifications yet!</Text>
      </View>
    );
  }

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
          keyExtractor={item => item._id}
          refreshing={loading}
          onRefresh={fetchNotifications}
        />
      </View>
    </MainContainer>
  );
};

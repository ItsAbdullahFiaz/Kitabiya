import React, {useContext, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {MainContainer} from '../../../components';
import {AppDataContext} from '../../../context';
import {useResponsiveDimensions} from '../../../hooks';
import {useNavigation} from '@react-navigation/native';
import {notificationService} from '../../../services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiService} from '../../../services/api';
import {Header, LoadingSkeleton, ProductList} from './components';
import {useProducts} from '../../../hooks/useProducts';
import {Text} from 'react-native';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [userName, setUserName] = useState('');

  const {data: products, isLoading, isError, error, refetch} = useProducts();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const permissionGranted =
          await notificationService.requestUserPermission();
        if (permissionGranted) {
          const emailId = await AsyncStorage.getItem('EMAIL');
          if (emailId) {
            await notificationService.saveFCMToken(emailId);
          }
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    const getName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('NAME');
        if (storedName !== null) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error('Error retrieving name from AsyncStorage:', error);
      }
    };

    getName();
  }, []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      newlyAddedContainer: {
        paddingHorizontal: hp(16),
        flex: 1,
      },
    });
  }, [hp, wp]);

  return (
    <MainContainer fullWidth>
      <Header appTheme={appTheme} navigation={navigation} />
      <View style={styles.newlyAddedContainer}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <ProductList
            products={products || []}
            userName={userName}
            appTheme={appTheme}
            navigation={navigation}
            onRefresh={refetch}
            isRefreshing={isLoading}
          />
        )}
      </View>
    </MainContainer>
  );
};

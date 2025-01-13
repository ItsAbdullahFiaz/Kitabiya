import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MainContainer } from '../../../components';
import { AppDataContext, useAuth } from '../../../context';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { notificationService } from '../../../services/NotificationService';
import { Header, LoadingSkeleton, ProductList } from './components';
import { useProducts } from '../../../hooks/useProducts';
import useUserPresence from '../../../hooks/useUserPresence';

export const HomeScreen = () => {
  // useUserPresence();
  const navigation = useNavigation<any>();
  const { appTheme } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const { authState } = useAuth();
  console.log('AUTH_STATE===>', authState);

  const { data: products, isLoading, isError, error, refetch } = useProducts();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const permissionGranted =
          await notificationService.requestUserPermission();
        if (permissionGranted) {
          const emailId = authState.email;
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

  const styles = useMemo(() => {
    return StyleSheet.create({
      newlyAddedContainer: {
        flex: 1,
      },
    });
  }, [hp, wp]);

  return (
    <MainContainer fullWidth>
      <Header
        appTheme={appTheme}
        navigation={navigation}
        authState={authState}
      />
      <View style={styles.newlyAddedContainer}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <ProductList
            products={products || []}
            userName={authState.userName}
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

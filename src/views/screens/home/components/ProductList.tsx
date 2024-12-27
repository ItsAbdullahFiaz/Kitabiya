import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { SCREENS } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';
import { ProductCard } from './ProductCard';
import { GreetingsSection } from './GreetingsSection';

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  condition: string;
  type: string;
  language: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface ProductListProps {
  products: Product[];
  userName: string;
  appTheme: any;
  navigation: any;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const ProductList = ({
  products,
  userName,
  appTheme,
  navigation,
  onRefresh,
  isRefreshing,
}: ProductListProps) => {
  const { hp, wp } = useResponsiveDimensions();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / 2 - 16;

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        padding: hp(8),
        paddingBottom: hp(50),
      },
      cardWrapper: {
        margin: hp(8),
      },
      emptyContainer: {
        padding: hp(20),
        alignItems: 'center',
        justifyContent: 'center',
      },
      emptyText: {
        fontSize: hp(14),
        color: '#666',
      },
    });
  }, [])


  const renderItems = ({ item, index }: { item: Product }) => {
    return (
      <View style={[styles.cardWrapper, { width: cardWidth }]}>
        <ProductCard
          item={item}
          onPress={() =>
            navigation.navigate(SCREENS.BOOK_DETAIL, { product: item })
          }
          appTheme={appTheme}
          index={index}
        />
      </View>
    );
  };

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <GreetingsSection userName={userName} appTheme={appTheme} />
      }
      data={products}
      renderItem={renderItems}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing || false}
          onRefresh={onRefresh}
          tintColor={appTheme.primary}
        />
      }
    />
  );
};

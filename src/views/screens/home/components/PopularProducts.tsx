import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AppDataContext} from '../../../../context';
import {SCREENS} from '../../../../enums';
import {SkeletonLoader} from '../../../../components';
import {apiService} from '../../../../services/api';

interface Product {
  _id: string;
  title: string;
  price: string;
  images: string[];
  condition: string;
}

export const PopularProducts = () => {
  const navigation = useNavigation<any>();
  const {appTheme} = useContext(AppDataContext);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [myAdsList, setMyAdsList] = useState([]);

  const fetchPopularProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getPopularProducts();
      console.log('API_RESPONSE_POPLAR===>', response?.data);
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch popular products');
      }
      setMyAdsList(response.data || []);
    } catch (error) {
      console.error('Error fetching popular products:', error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPopularProducts();
    }, []),
  );

  const getImageSource = (images: string[]) => {
    if (images && images.length > 0 && images[0]) {
      return {uri: images[0]};
    }
    return require('../../../../assets/images/books.jpg');
  };

  const renderSkeletonItem = () => (
    <View style={styles.productCard}>
      <SkeletonLoader width="100%" height={150} borderRadius={8} />
      <View style={styles.productInfo}>
        <SkeletonLoader width="80%" height={14} borderRadius={4} />
        <SkeletonLoader
          width="60%"
          height={12}
          borderRadius={4}
          style={{marginVertical: 4}}
        />
        <SkeletonLoader width="50%" height={12} borderRadius={4} />
      </View>
    </View>
  );

  const renderItem = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() =>
          navigation.navigate(SCREENS.BOOK_DETAIL, {product: item})
        }>
        <Image
          source={getImageSource(item.images)}
          style={styles.productImage}
          resizeMode="cover"
          defaultSource={require('../../../../assets/images/books.jpg')}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={1}>
            {item.title || 'Untitled'}
          </Text>
          <Text style={styles.productPrice}>Rs. {item.price || '0'}</Text>
          <Text style={styles.productCondition}>{item.condition || 'N/A'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isInitialLoad || loading) {
    return (
      <FlatList
        data={Array(5).fill({})}
        renderItem={renderSkeletonItem}
        keyExtractor={(item, index) => `skeleton-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    );
  }

  if (!loading && myAdsList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={myAdsList}
      renderItem={renderItem}
      keyExtractor={item => item?._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
  },
  productCard: {
    width: 150,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  productCondition: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
});

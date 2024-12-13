import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {useResponsiveDimensions} from '../../../../hooks';
import {FONT_SIZE, SCREENS, TEXT_STYLE} from '../../../../enums';
import {AppDataContext} from '../../../../context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SkeletonLoader} from '../../../../components';
import {apiService} from '../../../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  condition: string;
  type: string;
  language: string;
  user: User;
  createdAt: string;
}

export const NewlyAdded = () => {
  const navigation = useNavigation<any>();
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts();
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch products');
      }
      setNewlyAddedProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        paddingBottom: hp(50),
      },
      card: {
        height: hp(90),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(12),
      },
      leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      imgContainer: {
        width: hp(70),
        backgroundColor: appTheme.disabled,
        height: '100%',
        borderRadius: hp(8),
        overflow: 'hidden',
        marginRight: hp(12),
      },
      img: {
        width: '100%',
        height: '100%',
      },
      textContainer: {
        flex: 1,
      },
      viewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      views: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.primary,
        marginLeft: hp(5),
      },
      name: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.secondaryTextColor,
        textTransform: 'capitalize',
      },
      author: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.tertiaryTextColor,
        textTransform: 'capitalize',
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
  }, [hp, wp]);

  if (isInitialLoad || loading) {
    return (
      <View style={styles.container}>
        {Array.from({length: 5}).map((_, index) => (
          <View key={index} style={styles.card}>
            <SkeletonLoader
              width={hp(70)}
              height={hp(90)}
              borderRadius={hp(8)}
            />
            <View style={styles.textContainer}>
              <SkeletonLoader width="60%" height={hp(14)} borderRadius={4} />
              <SkeletonLoader
                width="40%"
                height={hp(12)}
                borderRadius={4}
                style={{marginTop: hp(4)}}
              />
              <SkeletonLoader
                width="30%"
                height={hp(10)}
                borderRadius={4}
                style={{marginTop: hp(6)}}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  const renderItems = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(SCREENS.BOOK_DETAIL, {product: item})
        }>
        <View style={styles.leftContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{uri: item.images[0]}}
              defaultSource={require('../../../../assets/images/person.jpg')}
            />
          </View>
          <View>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.author}>
              {item.user?.name || 'Unknown Author'}
            </Text>
            <Text style={styles.author}>{item.condition}</Text>
          </View>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.views}>PKR {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (!loading && newlyAddedProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newlyAddedProducts}
        renderItem={renderItems}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

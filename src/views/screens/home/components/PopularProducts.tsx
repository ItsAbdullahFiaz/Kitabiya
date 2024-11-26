import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppDataContext } from '../../../../context';
import { SCREENS } from '../../../../enums';

interface Product {
  _id: string;
  title: string;
  price: string;
  images: string[];
  condition: string;
}

interface PopularProductsProps {
  products: Product[];
}

export const PopularProducts = ({ products }: PopularProductsProps) => {
  const navigation = useNavigation<any>();
  const { appTheme } = useContext(AppDataContext);

  const getImageSource = (images: string[]) => {
    // Check if images array exists and has valid URL
    if (images && images.length > 0 && images[0]) {
      return { uri: images[0] };
    }
    // Return default image if no valid image URL
    return require('../../../../assets/images/books.jpg'); // Add your default image
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate(SCREENS.BOOK_DETAIL, { product: item })}
    >
      <Image
        source={getImageSource(item.images)}
        style={styles.productImage}
        resizeMode="cover"
        defaultSource={require('../../../../assets/images/books.jpg')} // Fallback while loading
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title || 'Untitled'}
        </Text>
        <Text style={styles.productPrice}>
          Rs. {item.price || '0'}
        </Text>
        <Text style={styles.productCondition}>
          {item.condition || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // If no products, show placeholder
  if (!products || products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 16
  },
  productCard: {
    width: 150,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0' // Placeholder color while loading
  },
  productInfo: {
    padding: 8
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2
  },
  productCondition: {
    fontSize: 12,
    color: '#888'
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 14,
    color: '#666'
  }
});

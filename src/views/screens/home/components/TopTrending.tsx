import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { useResponsiveDimensions } from '../../../../hooks';
import { topTrending } from '../../../../utils';
import { AnyIcon, IconType } from '../../../../components/AnyIcon';
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AppDataContext } from '../../../../context';

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

interface TopTrendingProps {
  products: Product[];
  loading: boolean;
}

export const TopTrending = ({ products, loading }: TopTrendingProps) => {
  const { appTheme } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        paddingBottom: hp(50)
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
      starsContainer: {
        flexDirection: 'row',
        marginTop: hp(5),
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
    });
  }, [hp, wp]);

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={appTheme.primary} />
      </View>
    );
  }

  const renderItems = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.leftContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{ uri: item.images[0] }}
              defaultSource={require('../../../../assets/images/person.jpg')}
            />
          </View>
          <View>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.author}>{item.user?.name || 'Unknown Author'}</Text>
            <View style={styles.starsContainer}>
              <Text style={styles.author}>{item.condition}</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.views}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItems}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

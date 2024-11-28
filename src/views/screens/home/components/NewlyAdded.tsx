import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {useResponsiveDimensions} from '../../../../hooks';
import {FONT_SIZE, SCREENS, TEXT_STYLE} from '../../../../enums';
import {AppDataContext} from '../../../../context';
import {useNavigation} from '@react-navigation/native';
import {SkeletonLoader} from '../../../../components';

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

interface NewlyAddedProps {
  products: Product[];
  loading: boolean;
}

export const NewlyAdded = ({products, loading}: NewlyAddedProps) => {
  const navigation = useNavigation<any>();
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
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
    });
  }, [hp, wp]);

  if (loading) {
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
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FONT_SIZE, SIZES, TEXT_STYLE } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';

interface ProductCardProps {
  item: any;
  onPress: () => void;
  appTheme: any;
  index: any;
}

export const ProductCard = ({
  item,
  onPress,
  appTheme,
  index,
}: ProductCardProps) => {
  const { hp } = useResponsiveDimensions();
  const [imageLoading, setImageLoading] = useState({});

  const handleImageLoadStart = (index: any) => {
    setImageLoading(prevState => ({ ...prevState, [index]: true }));
  };

  const handleImageLoadEnd = (index: any) => {
    setImageLoading(prevState => ({ ...prevState, [index]: false }));
  };

  return (
    <TouchableOpacity style={styles(hp, appTheme).card} onPress={onPress}>
      <View style={styles(hp, appTheme).imgContainer}>
        {imageLoading[index] && (
          <Image
            source={require('../../../../assets/images/appLogo.png')}
            style={styles(hp,appTheme).img}
            resizeMode={'center'}
          />
        )}
        <Image
          style={styles(hp, appTheme).img}
          source={{ uri: item.images[0] }}
          // defaultSource={require('../../../../assets/images/person.jpg')}
          onLoadStart={() => handleImageLoadStart(index)}
          onLoadEnd={() => handleImageLoadEnd(index)}
        />
      </View>
      <View style={styles(hp, appTheme).textContainer}>
        <Text
          numberOfLines={1}
          style={[
            styles(hp, appTheme).name,
            { color: appTheme.secondaryTextColor },
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles(hp, appTheme).author,
            { color: appTheme.tertiaryTextColor },
          ]}>
          {item?.condition}
        </Text>
        <Text style={[styles(hp, appTheme).price, { color: appTheme.primary }]}>
          Rs {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (hp: any, appTheme: any) =>
  StyleSheet.create({
    card: {
      marginBottom: hp(24),
      flex: 1,
      alignItems: 'center',
      marginHorizontal: hp(17),
      backgroundColor: appTheme.primaryBackground,
      borderRadius: hp(8),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    imgContainer: {
      width: SIZES.width / 2 - hp(50),
      height: hp(200),
      backgroundColor: appTheme.disabled,
      borderRadius: hp(8),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      margin: 5,
    },
    img: {
      width: '100%',
      height: '100%',
    },
    textContainer: {
      width: SIZES.width / 2 - hp(50),
      paddingHorizontal: hp(10),
      paddingVertical: hp(8),
    },
    price: {
      ...TEXT_STYLE.medium,
      fontSize: hp(FONT_SIZE.h4),
      color: appTheme.primary,
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

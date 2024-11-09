import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useResponsiveDimensions} from '../hooks';
import {topTrending} from '../utils';
import {AnyIcon, IconType} from './AnyIcon';
import {FONT, FONT_SIZE, OTHER_COLORS} from '../enums';

export const TopTrending = () => {
  const {hp, wp} = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
        container:{
            paddingBottom:hp(50)
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
        backgroundColor: OTHER_COLORS.imagePlaceholderColor,
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
        fontSize: FONT_SIZE.h5,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.primary,
        marginLeft: hp(5),
      },
      starsContainer: {
        flexDirection: 'row',
        marginTop: hp(5),
      },
      name: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.secondaryBlack,
        textTransform: 'capitalize',
      },
      author: {
        fontSize: FONT_SIZE.h5,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.grey,
        textTransform: 'capitalize',
      },
    });
  }, [hp, wp]);

  const renderItems = ({item}: any) => {
    const {image, name, author, rating} = item;
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <View style={styles.card}>
        <View style={styles.leftContainer}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={image} />
          </View>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.author}>{author}</Text>
            <View style={styles.starsContainer}>
              {[...Array(fullStars)].map((_, index) => (
                <AnyIcon
                  type={IconType.FontAwesome}
                  key={index}
                  name="star"
                  size={10}
                  color={OTHER_COLORS.star}
                />
              ))}
              {halfStars === 1 && (
                <AnyIcon
                  type={IconType.FontAwesome}
                  name="star-half"
                  size={10}
                  color={OTHER_COLORS.star}
                />
              )}
              {[...Array(emptyStars)].map((_, index) => (
                <AnyIcon
                  type={IconType.FontAwesome}
                  name="star-o"
                  size={10}
                  color={OTHER_COLORS.star}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.viewContainer}>
          <AnyIcon
            type={IconType.Ionicons}
            name="eye-outline"
            size={16}
            color={OTHER_COLORS.primary}
          />
          <Text style={styles.views}>237 views</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={topTrending} renderItem={renderItems} />
    </View>
  );
};

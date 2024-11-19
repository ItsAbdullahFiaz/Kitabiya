import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { useResponsiveDimensions } from '../../../../hooks';
import { topTrending } from '../../../../utils';
import { AnyIcon, IconType } from '../../../../components/AnyIcon';
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AppDataContext } from '../../../../context';

export const TopTrending = () => {
  const {appTheme}=useContext(AppDataContext);
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
        backgroundColor: appTheme.imagePlaceholderColor,
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
        fontSize: hp(FONT_SIZE.h5),
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
        color: appTheme.secondaryBlack,
        textTransform: 'capitalize',
      },
      author: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.grey,
        textTransform: 'capitalize',
      },
    });
  }, [hp, wp]);

  const renderItems = ({ item }: any) => {
    const { image, name, author, rating } = item;
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <TouchableOpacity style={styles.card}>
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
                  size={hp(FONT_SIZE.h6)}
                  color={appTheme.star}
                />
              ))}
              {halfStars === 1 && (
                <AnyIcon
                  type={IconType.FontAwesome}
                  name="star-half"
                  size={hp(FONT_SIZE.h6)}
                  color={appTheme.star}
                />
              )}
              {[...Array(emptyStars)].map((_, index) => (
                <AnyIcon
                  type={IconType.FontAwesome}
                  name="star-o"
                  size={hp(FONT_SIZE.h6)}
                  color={appTheme.star}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.viewContainer}>
          <AnyIcon
            type={IconType.Ionicons}
            name="eye-outline"
            size={hp(FONT_SIZE.h3)}
            color={appTheme.primary}
          />
          <Text style={styles.views}>237 views</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={topTrending} renderItem={renderItems} />
    </View>
  );
};

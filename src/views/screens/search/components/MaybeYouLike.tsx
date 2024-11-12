import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';
import { topTrending } from '../../../../utils';
import { AnyIcon, IconType } from '../../../../components/AnyIcon';

export const MaybeYouLike = () => {
  const { hp, wp } = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        marginTop: hp(30),
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        fontSize: FONT_SIZE.h3,
        fontFamily: FONT.PoppinsBold,
        color: OTHER_COLORS.black,
        textTransform: 'capitalize',
      },
      btnText: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.secondaryText,
      },
      card: {
        height: hp(70),
        width: hp(177),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: hp(10),
      },
      imgContainer: {
        width: hp(50),
        height: '100%',
        borderRadius: hp(8),
        overflow: 'hidden',
      },
      img: {
        width: '100%',
        height: '100%',
      },
      starsContainer: {
        flexDirection: 'row',
        marginTop: hp(5),
      },
      contentContainer: {
        marginLeft: hp(10),
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
      columnWrapper: {
        justifyContent: 'space-between',
      },
    });
  }, [hp, wp, OTHER_COLORS, FONT, FONT_SIZE]);
  const renderList = ({ item }: any) => {
    const { image, name, author, rating } = item;
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={image} />
        </View>
        <View style={styles.contentContainer}>
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
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>maybe you like</Text>
        <TouchableOpacity>
          <Text style={styles.btnText}>See more</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          numColumns={2}
          data={topTrending}
          renderItem={renderList}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  );
};

import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../../enums';
import { topTrending } from '../../../../utils';
import { AnyIcon, IconType } from '../../../../components/AnyIcon';

export const NewlyPublished = () => {
  const { hp, wp } = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      card: {
        height: hp(252),
        width: hp(120),
        marginRight: hp(18)
      },
      imgContainer: {
        width: "100%",
        height: hp(160),
        borderRadius: hp(8),
        overflow: "hidden"
      },
      img: {
        width: "100%",
        height: "100%",
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
      starsContainer: {
        flexDirection: 'row',
        marginTop: hp(5),
      },
      price: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.primary,
        marginTop: hp(3)
      },
      free: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.green,
        textTransform: "capitalize",
        marginTop: hp(3)
      }
    })
  }, [hp, wp, FONT, FONT_SIZE, OTHER_COLORS])
  const renderList = ({ item }: any) => {
    const { image, name, author, rating, price } = item;
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={image} />
        </View>
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
        {price > 0 ? (
          <Text style={styles.price}>{`$${price}`}</Text>
        ) : (
          <Text style={styles.free}>free</Text>
        )}
      </View>
    )
  }
  return (
    <View>
      <FlatList horizontal data={topTrending} renderItem={renderList} />
    </View>
  )
}

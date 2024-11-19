import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { topTrending } from '../../../../utils';
import { AnyIcon, IconType } from '../../../../components/AnyIcon';
import { AppDataContext } from '../../../../context';

export const NewlyPublished = () => {
  const {appTheme}=useContext(AppDataContext);
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
      starsContainer: {
        flexDirection: 'row',
        marginTop: hp(5),
      },
      price: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.primary,
        marginTop: hp(3)
      },
      free: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.green,
        textTransform: "capitalize",
        marginTop: hp(3)
      }
    })
  }, [hp, wp])
  const renderList = ({ item }: any) => {
    const { image, name, author, rating, price } = item;
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <TouchableOpacity style={styles.card}>
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
        {price > 0 ? (
          <Text style={styles.price}>{`$${price}`}</Text>
        ) : (
          <Text style={styles.free}>free</Text>
        )}
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <FlatList horizontal data={topTrending} renderItem={renderList} />
    </View>
  )
}

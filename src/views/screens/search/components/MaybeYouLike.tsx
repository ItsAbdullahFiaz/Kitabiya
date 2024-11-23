import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo } from 'react';
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';
import { topTrending } from '../../../../utils';
import { AnyIcon, IconType } from '../../../../components/AnyIcon';
import { AppDataContext } from '../../../../context';

export const MaybeYouLike = () => {
  const { appTheme, appLang } = useContext(AppDataContext);
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
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      btnText: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.interactive,
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
      columnWrapper: {
        justifyContent: 'space-between',
      },
    });
  }, [hp, wp]);
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
                size={hp(FONT_SIZE.h6)}
                color={OTHER_COLORS.yellow}
              />
            ))}
            {halfStars === 1 && (
              <AnyIcon
                type={IconType.FontAwesome}
                name="star-half"
                size={hp(FONT_SIZE.h6)}
                color={OTHER_COLORS.yellow}
              />
            )}
            {[...Array(emptyStars)].map((_, index) => (
              <AnyIcon
                type={IconType.FontAwesome}
                name="star-o"
                size={hp(FONT_SIZE.h6)}
                color={OTHER_COLORS.yellow}
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
        <Text style={styles.title}>{appLang.maybeyoulike}</Text>
        <TouchableOpacity>
          <Text style={styles.btnText}>{appLang.Seemore}</Text>
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

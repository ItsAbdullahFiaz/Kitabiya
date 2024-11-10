import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { AnyIcon, Header, IconType, LoginButton, MainContainer } from '../../../components';
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../enums';
import { useResponsiveDimensions } from '../../../hooks';

export const BookDetailScreen = ({ route }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  const { hp, wp } = useResponsiveDimensions();
  const data = route?.params?.book;
  const shouldShowReadMore = data.description.length > 100;
  const fullStars = Math.floor(data.rating);
  const halfStars = data.rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  // Truncate the text if needed and add the "Read more" link inline
  const displayText =
    isExpanded || !shouldShowReadMore
      ? data.description
      : `${data.description.slice(0, 100).trim()}... `;

  const styles = useMemo(() => {
    return StyleSheet.create({
      starsContainer: {
        flexDirection: 'row',
        marginVertical: hp(5),
      },
      introContainer: {
        marginTop: hp(30),
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      imgContainer: {
        width: hp(101),
        height: hp(152),
        borderRadius: hp(8),
        overflow: 'hidden',
      },
      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      nameContainer: {
        marginLeft: hp(20),
      },
      name: {
        fontSize: FONT_SIZE.h3,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.secondaryBlack,
        textTransform: 'capitalize',
      },
      author: {
        marginVertical: hp(5),
        fontSize: FONT_SIZE.h5,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.grey,
        textTransform: 'capitalize',
      },
      price: {
        marginVertical: hp(5),
        fontSize: FONT_SIZE.h3,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.primary,
      },
      genreContainer: {
        backgroundColor: OTHER_COLORS.backButtonBackground,
        height: hp(26),
        borderRadius: hp(12),
        marginRight: hp(8),
        paddingHorizontal: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
      },
      free: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.green,
        textTransform: 'capitalize',
        marginTop: hp(3),
        marginVertical: hp(5),
      },
      genreText: {
        fontSize: FONT_SIZE.h5,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.secondaryText,
        textTransform: 'capitalize',
      },
      detailsContainer: {
        marginTop: hp(30),
      },
      detailHeading: {
        fontSize: FONT_SIZE.h3,
        fontFamily: FONT.PoppinsBold,
        color: OTHER_COLORS.black,
        textTransform: 'capitalize',
      },
      textContainer: {
        marginVertical: hp(10),
      },
      text: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.secondaryText,
      },
      readMore: {
        color: OTHER_COLORS.secondary,
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsRegular
      },
      chatBtnContainer: {
        position: "absolute",
        bottom: hp(20),
        width: "100%",
        alignSelf: "center"
      }
    });
  }, [hp, wp, FONT, FONT_SIZE, OTHER_COLORS]);

  return (
    <MainContainer>
      <Header title="book detail" />
      <View style={styles.introContainer}>
        <View style={styles.imgContainer}>
          <Image source={data.image} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.author}>{data.author}</Text>
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
          {data.price > 0 ? (
            <Text style={styles.price}>{`$${data.price}`}</Text>
          ) : (
            <Text style={styles.free}>free</Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {data.category.map((item: any, index: any) => {
              return (
                <View key={index} style={styles.genreContainer}>
                  <Text style={styles.genreText}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailHeading}>details</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {displayText}
            {!isExpanded && shouldShowReadMore && (
              <Text onPress={toggleText} style={styles.readMore}>
                Read more
              </Text>
            )}
            {isExpanded && shouldShowReadMore && (
              <Text onPress={toggleText} style={styles.readMore}>
                Show less
              </Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.chatBtnContainer}>
        <LoginButton title="chat now" />
      </View>
    </MainContainer>
  );
};

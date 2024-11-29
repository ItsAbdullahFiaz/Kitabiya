import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useMemo } from 'react'
import { useResponsiveDimensions } from '../../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE } from '../../../../enums';
import { FlatList } from 'react-native';
import { topTrending } from '../../../../utils';
import { useNavigation } from '@react-navigation/native';
import { AppDataContext } from '../../../../context';
export const ContinueReading = () => {
  const { appTheme, appLang } = useContext(AppDataContext);
  const navigation = useNavigation<any>();
  const { hp, wp } = useResponsiveDimensions();

  const styles = useMemo(() => {
    return StyleSheet.create({
      header: {
        marginTop: hp(20),
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
        color: appTheme.tertiaryTextColor,
      },
      card: {
        width: hp(120),
        height: hp(222),
        marginRight: hp(13)
      },
      imgContainer: {
        width: "100%",
        height: hp(160),
        borderRadius: hp(8),
        overflow: "hidden"
      },
      img: {
        width: "100%",
        height: hp(160)
      },
      name: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.primaryTextColor,
        textTransform: "capitalize"
      },
      author: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.tertiaryTextColor,
        textTransform: "capitalize"
      },
      chap: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h6),
        color: appTheme.primary,
        textTransform: "capitalize"
      }
    })
  }, [hp, wp])

  const renderList = ({ item }: any) => {
    const { name, image, author, totalPages, onPage } = item;
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(SCREENS.BOOK_DETAIL as never, { book: item })}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={image} />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.chap}>{`chap ${onPage}/${totalPages}`}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <>
      <View style={{ padding: hp(16) }}>
        <View style={styles.header}>
          <Text style={styles.title}>{appLang.continuereading}</Text>
          <TouchableOpacity>
            <Text style={styles.btnText}>{appLang.Seemore}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingLeft: hp(16) }}>
        <FlatList
          horizontal
          data={topTrending}
          renderItem={renderList}
        />
      </View>
    </>
  )
}

export default ContinueReading

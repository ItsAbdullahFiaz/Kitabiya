import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS, SCREENS } from '../../../../enums';
import { FlatList } from 'react-native';
import { topTrending } from '../../../../utils';
import { useNavigation } from '@react-navigation/native';

export const ContinueReading = () => {
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
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.darkBlack,
        textTransform: "capitalize"
      },
      author: {
        fontSize: FONT_SIZE.h5,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.grey,
        textTransform: "capitalize"
      },
      chap: {
        fontSize: FONT_SIZE.h6,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.primary,
        textTransform: "capitalize"
      }
    })
  }, [hp, wp, FONT, FONT_SIZE, OTHER_COLORS])

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
          <Text style={styles.title}>continue reading</Text>
          <TouchableOpacity>
            <Text style={styles.btnText}>See more</Text>
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

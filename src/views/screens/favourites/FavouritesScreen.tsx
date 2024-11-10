import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import React, { useMemo } from 'react'
import { AnyIcon, Header, IconType, MainContainer } from '../../../components'
import { FONT, FONT_SIZE, OTHER_COLORS } from '../../../enums'
import { useResponsiveDimensions } from '../../../hooks'
import { topTrending } from '../../../utils'

export const FavouritesScreen = () => {
  const { hp, wp } = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      searchContainer: {
        marginTop: hp(20),
        height: hp(40),
        width: '100%',
        borderRadius: hp(12),
        backgroundColor: OTHER_COLORS.backButtonBackground,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: hp(10),
      },
      input: {
        height: '100%',
        marginTop: hp(5),
        paddingTop: hp(5),
      },
      card: {
        marginTop: hp(20),
        height: hp(140),
        width: hp(113),
        borderRadius: hp(8),
        overflow: "hidden",
        borderWidth: 0.3,
        borderColor: OTHER_COLORS.backButtonBackground
      },
      img: {
        height: hp(85),
        width: "100%",
      },
      name: {
        fontSize: FONT_SIZE.h4,
        fontFamily: FONT.PoppinsMedium,
        color: OTHER_COLORS.black,
        textTransform: "capitalize",
        textAlign: "center",
        marginTop: hp(3)
      },
      total: {
        fontSize: FONT_SIZE.h5,
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.secondaryText,
        textAlign: "center"
      },
      columnWrapper: {
        justifyContent: "space-between"
      },
      listContainer: {
        marginTop: hp(10),
        paddingBottom: hp(100)
      }
    })
  }, [hp, wp, OTHER_COLORS, FONT, FONT_SIZE])

  const renderList = ({ item }: any) => {
    const { image, name, total } = item;
    return (
      <TouchableOpacity style={styles.card}>
        <Image style={styles.img} source={image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.total}>{`${total} in total`}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <MainContainer>
      <Header title="favourites" />
      <View style={styles.searchContainer}>
        <AnyIcon
          type={IconType.EvilIcons}
          name="search"
          color={OTHER_COLORS.border}
          size={16}
        />
        <TextInput
          style={styles.input}
          placeholder="Search here"
          placeholderTextColor={OTHER_COLORS.border}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          numColumns={3}
          data={topTrending}
          renderItem={renderList}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </MainContainer>
  )
}
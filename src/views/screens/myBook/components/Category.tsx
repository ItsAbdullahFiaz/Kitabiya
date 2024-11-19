import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { topTrending } from '../../../../utils';
import { AppDataContext } from '../../../../context';

export const Category = () => {
    const {appTheme,appLang} = useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const styles = useMemo(() => {
        return StyleSheet.create({
            title: {
                ...TEXT_STYLE.bold,
                fontSize: hp(FONT_SIZE.h3),
                color: appTheme.primaryTextColor,
                textTransform: "capitalize"
            },
            card: {
                height: hp(140),
                width: hp(113),
                borderWidth: 0.5,
                borderColor: appTheme.secondaryBackground,
                borderTopRightRadius: hp(8),
                borderTopLeftRadius: hp(8),
                overflow: "hidden",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: hp(12),
                elevation: 0.1
            },
            imgContainer: {
                width: "100%",
                height: hp(85)
            },
            img: {
                width: "100%",
                height: "100%"
            },
            columnWrapper: {
                justifyContent: 'space-between',
            },
            name: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h4),
                color: appTheme.primaryTextColor,
                textTransform: "capitalize"
            },
            total: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.tertiaryTextColor,
            }
        })
    }, [hp, wp])
    const renderList = ({ item }: any) => {
        const { name, image, total } = item;
        return (
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={image} />
                </View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.total}>{`${total} in total`}</Text>
            </View>
        )
    }
    return (
        <>
            <Text style={styles.title}>{appLang.category}</Text>
            <View>
                <FlatList
                    numColumns={3}
                    data={topTrending}
                    renderItem={renderList}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
        </>
    )
}

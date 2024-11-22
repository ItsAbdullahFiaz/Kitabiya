import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { AnyIcon, BackButton, IconType, MainContainer } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../enums'
import { MaybeYouLike } from './components'
import { AppDataContext } from '../../../context'


const data = ['history', 'science fiction', 'families', 'humor', 'thriller', 'self-help', 'personal', 'the wood', 'adventure'];
export const SearchScreen = () => {
    const {appTheme ,appLang}=useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const styles = useMemo(() => {
        return StyleSheet.create({
            header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            },
            searchContainer: {
                height: hp(40),
                width: hp(329),
                borderRadius: hp(12),
                backgroundColor: appTheme.secondaryBackground,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: hp(10)
            },
            input: {
                height: "100%",
                marginTop: hp(5),
                paddingTop: hp(5),
                color:appTheme.secondaryTextColor
            },
            recent: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: hp(20)
            },
            text: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.darkBlack,
                textTransform: "capitalize"
            },
            textContainer: {
                height: hp(26),
                borderRadius: hp(12),
                paddingHorizontal: hp(10),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "rgba(90, 108, 248, 0.1)",
                marginHorizontal: hp(6),
                marginVertical: hp(10)

            },
            btnText: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.tertiaryTextColor,
            },
            searchedText: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.primary,
                marginRight: hp(8),
                textTransform: "capitalize"
            },
            listContainer: {
                flexDirection: "row",
                flexWrap: 'wrap',
                marginTop: hp(10)
            }
        })
    }, [hp, wp])

    return (
        <MainContainer>
            <View style={styles.header}>
                <BackButton />
                <View style={styles.searchContainer}>
                    <AnyIcon
                        type={IconType.EvilIcons}
                        name="search"
                        color={appTheme.inputBorder}
                        size={16}
                    />
                    <TextInput style={styles.input} placeholder={appLang.Searchhere} placeholderTextColor={appTheme.inputBorder} />
                </View>
            </View>
            <View style={styles.recent}>
                <Text style={styles.text}>{appLang.recently}</Text>
                <TouchableOpacity>
                    <Text style={styles.btnText}>{appLang.Deleteall}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                {data.map((item, index) => {
                    return (
                        <View key={index} style={styles.textContainer}>
                            <Text style={styles.searchedText}>{item}</Text>
                            <TouchableOpacity>
                                <AnyIcon
                                    type={IconType.EvilIcons}
                                    name='close'
                                    size={16}
                                    color={appTheme.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            <MaybeYouLike />
        </MainContainer>
    )
}
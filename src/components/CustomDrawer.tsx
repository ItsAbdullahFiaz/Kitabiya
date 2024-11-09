import { StyleSheet, View, FlatList, Text } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { AnyIcon, AppIcon, ButtonRow, CustomModal, IconType } from '.'
import { AUTO_THEME_MODE, AppDataContext, DARK_THEME_MODE, LIGHT_THEME_MODE } from '../context'
import { useResponsiveDimensions } from '../hooks'
import { OTHER_TEXT_STYLE, SCREENS, SIZES } from '../enums'
import { storeStringValue } from '../utils'

export const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const { appLang, appTheme, setActiveThemeMode, activeThemeMode, setActiveLang, activeLang, langTranslations } = useContext(AppDataContext);
    const { wp, hp } = useResponsiveDimensions();
    const [langModalVisible, setLangModalVisible] = useState(false);
    const [themeModalVisible, setThemeModalVisible] = useState(false)
    const navigation = useNavigation()

    const switchTheme = (themeMode: string) => {
        setActiveThemeMode(themeMode);
        storeStringValue('@ThemeState', themeMode)
    }

    const switchLanguage = (lang: string) => {
        setActiveLang(lang)
    }

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <ButtonRow
                onPress={() => switchLanguage(item.value)}
                title={item.key}
                index={index}
                bgStyle={{ backgroundColor: item.value == activeLang ? appTheme.primary : appTheme.primaryLight }}
                titleStyle={{ color: item.value == activeLang ? appTheme.secondary : appTheme.textColor }}
            />
        )
    }

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: appTheme.secondary,
            },
            greeting: {
                ...OTHER_TEXT_STYLE.caption,
                fontSize: hp(16),
                color: appTheme.primary,
                marginBottom: hp(12)
            },
            innerContainer: {
                width: '100%'
            },
            languageRow: {
                paddingHorizontal: hp(6)
            },
            langCustomModalContainer: {
                height: SIZES.height - hp(330)
            },
            themeCustomModalContainer: {
                height: SIZES.height - hp(700)
            }
        });
    }, [wp, hp, appTheme]);

    return (
        <View style={styles.container}>
            <AppIcon />
            <Text style={styles.greeting}>{appLang.greeting}</Text>
            <View style={styles.innerContainer}>

                <ButtonRow
                    onPress={() => navigation.navigate(SCREENS.HOME as never)}
                    contentRight={
                        <AnyIcon
                            type={IconType.AntDesign}
                            name='home'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={appLang.home}
                />

                <ButtonRow
                    onPress={() => setThemeModalVisible(true)}
                    contentRight={
                        <AnyIcon
                            type={IconType.Ionicons}
                            name='invert-mode'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={appLang.theme_mode}
                />

                <ButtonRow
                    onPress={() => setLangModalVisible(true)}
                    contentRight={
                        <AnyIcon
                            type={IconType.Ionicons}
                            name='language-outline'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={appLang.change_lang}
                />

                <ButtonRow
                    onPress={() => navigation.navigate(SCREENS.PRIVACY_POLICY as never)}
                    contentRight={
                        <AnyIcon
                            type={IconType.Ionicons}
                            name='shield-half'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={appLang.privacy_policy}
                />

                <ButtonRow
                    onPress={() => navigation.navigate(SCREENS.TERMS as never)}
                    contentRight={
                        <AnyIcon
                            type={IconType.Ionicons}
                            name='document-text-outline'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={appLang.terms_conditions}
                    hideBorder={true}
                />

                <CustomModal
                    visible={langModalVisible}
                    onClose={() => setLangModalVisible(false)}
                    title={appLang.change_lang}
                >
                    <View style={styles.langCustomModalContainer}>
                        <FlatList
                            data={langTranslations}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </CustomModal>

                <CustomModal
                    visible={themeModalVisible}
                    onClose={() => setThemeModalVisible(false)}
                    title={appLang.theme_mode}
                >
                    <View style={styles.themeCustomModalContainer}>
                        <ButtonRow
                            onPress={() => switchTheme(AUTO_THEME_MODE)}
                            title={appLang.auto}
                            bgStyle={{ backgroundColor: activeThemeMode == AUTO_THEME_MODE ? appTheme.primary : appTheme.primaryLight }}
                            titleStyle={{ color: activeThemeMode == AUTO_THEME_MODE ? appTheme.secondary : appTheme.textColor }}
                        />

                        <ButtonRow
                            onPress={() => switchTheme(LIGHT_THEME_MODE)}
                            title={appLang.light}
                            bgStyle={{ backgroundColor: activeThemeMode == LIGHT_THEME_MODE ? appTheme.primary : appTheme.primaryLight }}
                            titleStyle={{ color: activeThemeMode == LIGHT_THEME_MODE ? appTheme.secondary : appTheme.textColor }}
                        />

                        <ButtonRow
                            onPress={() => switchTheme(DARK_THEME_MODE)}
                            title={appLang.dark}
                            bgStyle={{ backgroundColor: activeThemeMode == DARK_THEME_MODE ? appTheme.primary : appTheme.primaryLight }}
                            titleStyle={{ color: activeThemeMode == DARK_THEME_MODE ? appTheme.secondary : appTheme.textColor }}
                        />
                    </View>
                </CustomModal>
                {/* <DrawerItemList {...props} /> */}
            </View>
        </View>
    )
}
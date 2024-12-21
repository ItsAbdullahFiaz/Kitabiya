import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  AnyIcon,
  IconType,
  MainButton,
  MainContainer,
} from '../../../components';
import {useResponsiveDimensions, useToast} from '../../../hooks';
import {FONT_SIZE, SCREENS, SIZES, TEXT_STYLE} from '../../../enums';
import {signOutUser} from '../../../services';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ProfileHeader} from './components';
import {
  AppDataContext,
  AUTO_THEME_MODE,
  DARK_THEME_MODE,
  LIGHT_THEME_MODE,
} from '../../../context';
import {ButtonRow, CustomModal} from '../../../components/unused';
import {storeStringValue} from '../../../utils';
import {apiService} from '../../../services/api';

export const AccountScreen = () => {
  const [appVersion, setAppVersion] = useState('1.0.1');
  const {
    appLang,
    appTheme,
    setActiveThemeMode,
    activeThemeMode,
    setActiveLang,
    activeLang,
    langTranslations,
  } = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const navigation = useNavigation<any>();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [userProfileData, setUserProfileData] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const fetchUserProfileData = async () => {
    try {
      const response = await apiService.getUserProfileData();
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to fetch User Profile Data',
        );
      }
      setUserProfileData(response.data.user || []);
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      showToast(error.message, 'errorToast');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfileData();
    }, []),
  );

  const switchTheme = (themeMode: string) => {
    setActiveThemeMode(themeMode);
    storeStringValue('@ThemeState', themeMode);
  };

  const switchLanguage = (lang: string) => {
    setActiveLang(lang);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <ButtonRow
        onPress={() => switchLanguage(item.value)}
        title={item.key}
        index={index}
        bgStyle={{
          backgroundColor:
            item.value == activeLang
              ? appTheme.primary
              : appTheme.secondaryBackground,
        }}
        titleStyle={{
          color:
            item.value == activeLang
              ? appTheme.quaternaryTextColor
              : appTheme.primaryTextColor,
        }}
      />
    );
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      buttonsContainer: {
        marginTop: hp(50),
      },
      versionText: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.tertiaryTextColor,
        textAlign: 'center',
        marginTop: hp(20),
      },
      languageRow: {
        paddingHorizontal: hp(6),
      },
      themeCustomModalContainer: {
        height: SIZES.height - hp(700),
      },
      langCustomModalContainer: {
        height: SIZES.height - hp(330),
      },
      logoutButtonContainer: {
        marginTop: hp(40),
      },
    });
  }, [hp, wp]);

  return (
    <MainContainer>
      <ProfileHeader userInfo={userProfileData} />
      <View style={styles.buttonsContainer}>
        <ButtonRow
          onPress={() =>
            navigation.navigate(SCREENS.PROFILE as never, {
              userData: userProfileData,
            })
          }
          contentRight={
            <AnyIcon
              type={IconType.Octicons}
              name="person"
              size={hp(20)}
              color={appTheme.primary}
            />
          }
          contentRightStyle={styles.languageRow}
          title={appLang.Profile}
        />

        <ButtonRow
          onPress={() => setLangModalVisible(true)}
          contentRight={
            <AnyIcon
              type={IconType.Fontisto}
              name="world-o"
              size={hp(20)}
              color={appTheme.primary}
            />
          }
          contentRightStyle={styles.languageRow}
          title={appLang.Language}
        />

        <ButtonRow
          onPress={() => setThemeModalVisible(true)}
          contentRight={
            <AnyIcon
              type={IconType.Ionicons}
              name="invert-mode"
              size={hp(20)}
              color={appTheme.primary}
            />
          }
          contentRightStyle={styles.languageRow}
          title={appLang.theme_mode}
        />

        <ButtonRow
          onPress={() => navigation.navigate(SCREENS.PRIVACY_POLICY as never)}
          contentRight={
            <AnyIcon
              type={IconType.MaterialIcons}
              name="lock-outline"
              size={hp(20)}
              color={appTheme.primary}
            />
          }
          contentRightStyle={styles.languageRow}
          title={appLang.PrivacyPolicy}
        />

        <ButtonRow
          onPress={() => navigation.navigate(SCREENS.HELP_CENTER as never)}
          contentRight={
            <AnyIcon
              type={IconType.MaterialIcons}
              name="info-outline"
              size={hp(20)}
              color={appTheme.primary}
            />
          }
          contentRightStyle={styles.languageRow}
          title={appLang.HelpCenter}
          hideBorder={true}
        />
      </View>

      <View style={styles.logoutButtonContainer}>
        <MainButton
          onPress={() => signOutUser(navigation)}
          buttonText={appLang.logout}
          dismissiveButton
        />
      </View>

      <Text style={styles.versionText}>
        {appLang.version} {appVersion}
      </Text>

      <CustomModal
        visible={langModalVisible}
        onClose={() => setLangModalVisible(false)}
        title={appLang.change_lang}>
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
        title={appLang.theme_mode}>
        <View style={styles.themeCustomModalContainer}>
          <ButtonRow
            onPress={() => switchTheme(AUTO_THEME_MODE)}
            title={appLang.auto}
            bgStyle={{
              backgroundColor:
                activeThemeMode == AUTO_THEME_MODE
                  ? appTheme.primary
                  : appTheme.secondaryBackground,
            }}
            titleStyle={{
              color:
                activeThemeMode == AUTO_THEME_MODE
                  ? appTheme.quaternaryTextColor
                  : appTheme.primaryTextColor,
            }}
          />

          <ButtonRow
            onPress={() => switchTheme(LIGHT_THEME_MODE)}
            title={appLang.light}
            bgStyle={{
              backgroundColor:
                activeThemeMode == LIGHT_THEME_MODE
                  ? appTheme.primary
                  : appTheme.secondaryBackground,
            }}
            titleStyle={{
              color:
                activeThemeMode == LIGHT_THEME_MODE
                  ? appTheme.quaternaryTextColor
                  : appTheme.primaryTextColor,
            }}
          />

          <ButtonRow
            onPress={() => switchTheme(DARK_THEME_MODE)}
            title={appLang.dark}
            bgStyle={{
              backgroundColor:
                activeThemeMode == DARK_THEME_MODE
                  ? appTheme.primary
                  : appTheme.secondaryBackground,
            }}
            titleStyle={{
              color:
                activeThemeMode == DARK_THEME_MODE
                  ? appTheme.quaternaryTextColor
                  : appTheme.primaryTextColor,
            }}
            hideBorder={true}
          />
        </View>
      </CustomModal>
    </MainContainer>
  );
};

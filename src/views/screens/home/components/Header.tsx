import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AnyIcon, IconType } from '../../../../components';
import { SCREENS } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';
import UserAvatar from 'react-native-user-avatar';
import { getColorByFirstLetter } from '../../../../utils';

interface HeaderProps {
  appTheme: any;
  navigation: any;
  authState?: any;
}

export const Header = ({ appTheme, navigation, authState }: HeaderProps) => {
  const { hp } = useResponsiveDimensions();
  console.log("AUTHSTATE_HOME===>", authState);

  return (
    <View style={styles(hp).homeHeader}>
      <View style={styles(hp).iconContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate(SCREENS.NOTIFICATION)}>
          <AnyIcon
            type={IconType.SimpleLineIcons}
            name="bell"
            color={appTheme.primaryTextColor}
            size={20}
          />
        </TouchableOpacity>
        <View style={styles(hp).rightIcons}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles(hp).searchIcon}
            onPress={() => navigation.navigate(SCREENS.SEARCH)}>
            <AnyIcon
              type={IconType.Feather}
              name="search"
              color={appTheme.primaryTextColor}
              size={26}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate(SCREENS.ACCOUNT)}>
            <UserAvatar
              style={styles(hp).userImage}
              size={40}
              name={authState?.userName}
              bgColor={getColorByFirstLetter(authState?.userName)}
              src={authState.profilePhoto}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = (hp: any) =>
  StyleSheet.create({
    homeHeader: {
      height: hp(72),
      paddingVertical: hp(16),
      paddingHorizontal: hp(32),
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      marginRight: hp(12),
    },
    userImage: {
      width: hp(40),
      height: hp(40),
      borderRadius: hp(20),
    },
  });

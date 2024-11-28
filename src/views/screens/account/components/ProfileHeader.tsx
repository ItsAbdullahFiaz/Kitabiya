import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {FONT, FONT_SIZE, OTHER_COLORS, TEXT_STYLE} from '../../../../enums';
import {useResponsiveDimensions} from '../../../../hooks';
import {AppDataContext} from '../../../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileHeader = ({userInfo}: any) => {
  const [name, setName] = useState<string | null>(null);
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();

  const getName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('NAME');
      if (storedName !== null) {
        setName(storedName);
      }
    } catch (error) {
      console.error('Error retrieving name from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      profileHeader: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(20),
      },
      imgContainer: {
        height: hp(88),
        width: hp(88),
        borderRadius: hp(44),
        backgroundColor: appTheme.disabled,
        overflow: 'hidden',
      },
      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      name: {
        ...TEXT_STYLE.medium,
        marginTop: hp(5),
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.secondaryTextColor,
        textTransform: 'capitalize',
      },
      gmail: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.tertiaryTextColor,
      },
    });
  }, [hp, wp]);
  return (
    <>
      {userInfo ? (
        <View style={styles.profileHeader}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{uri: userInfo.photoURL}} />
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.gmail}>{userInfo.email}</Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

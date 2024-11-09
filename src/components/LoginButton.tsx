import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../enums';
import {useResponsiveDimensions} from '../hooks';

export const LoginButton = ({title,onPress} : any) => {
  const navigation = useNavigation();
  const {hp, wp} = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      btnContainer: {
        height: hp(48),
        width: '100%',
        backgroundColor: '#5A6CF8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(30),
      },
      btnText: {
        fontSize: 16,
        fontWeight: 'medium',
        fontFamily: 'Poppins-Regular',
        color: '#fff',
        textTransform: 'capitalize',
      },
    });
  }, []);
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

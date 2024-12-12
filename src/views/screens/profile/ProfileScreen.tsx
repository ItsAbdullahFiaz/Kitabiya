import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {Header, MainContainer} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
import {AppDataContext} from '../../../context';
import Name from './Name';

export const ProfileScreen = () => {
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme} = useContext(AppDataContext);
  const styles = useMemo(() => {
    return StyleSheet.create({
      imgContainer: {
        height: hp(88),
        width: hp(88),
        borderRadius: hp(44),
        backgroundColor: appTheme.disabled,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: hp(50),
        position: 'relative',
        borderColor:"#ca5a5a",
        borderWidth:1
      },
      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      overlayImg: {
        position: 'absolute',
        bottom: 15,
        right: -3,
        height: hp(20),
        width: hp(20),
      },
    });
  }, [hp, wp,appTheme]);
  return (
    <MainContainer>
      <Header title="edit profile" />
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require('../../../assets/images/user.png')}
        />
        <Image
          style={styles.overlayImg}
          source={require('../../../assets/images/profile2.png')}
        />
      </View>
      <Name/>
    </MainContainer>
  );
};

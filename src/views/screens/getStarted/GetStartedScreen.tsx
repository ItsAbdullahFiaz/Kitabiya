import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useMemo } from 'react';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { FONT, OTHER_COLORS, STACK } from '../../../enums';
import { MainContainer } from '../../../components';

export const GetStartedScreen = () => {
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();

  const styles = useMemo(() => {
    return StyleSheet.create({
      img: {
        width: hp(380),
        height: hp(380),
        marginTop: hp(50),
      },
      heading: {
        width: '80%',
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: OTHER_COLORS.black,
        textAlign: 'center',
        fontFamily: FONT.PoppinsBold,
        marginTop: hp(20),
      },
      subHeading: {
        width: '80%',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'regular',
        fontFamily: FONT.PoppinsRegular,
        marginTop: hp(20),
      },
      btnContainer: {
        height: hp(48),
        width: '100%',
        backgroundColor: OTHER_COLORS.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(50),
      },
      btnText: {
        fontSize: 16,
        fontWeight: 'medium',
        fontFamily: FONT.PoppinsRegular,
        color: OTHER_COLORS.white,
        textTransform: 'capitalize',
      },
    });
  }, [OTHER_COLORS, FONT, hp, wp]);
  return (
    <MainContainer>
      <Image
        style={styles.img}
        source={require('../../../assets/images/getStartedImage.png')}
      />
      <Text style={styles.heading}>increase your skill in no time</Text>
      <Text style={styles.subHeading}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor
      </Text>
      <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate(STACK.AUTH as never)}>
        <Text style={styles.btnText}>get started</Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

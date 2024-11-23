import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { useResponsiveDimensions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { FONT, FONT_SIZE, OTHER_COLORS, STACK, TEXT_STYLE } from '../../../enums';
import { MainButton, MainContainer } from '../../../components';
import { AppDataContext } from '../../../context';

export const GetStartedScreen = () => {
  const {appLang, appTheme } = useContext(AppDataContext);
  const navigation = useNavigation();
  const { hp, wp } = useResponsiveDimensions();
  const [loading, setLoading] = useState(false);
  const handleSwitch=()=>{
    navigation.navigate(STACK.AUTH as never);
  }
  const styles = useMemo(() => {
    return StyleSheet.create({
      img: {
        width: hp(380),
        height: hp(380),
      },
      imgContainer: {
        marginTop: hp(50),
      },
      heading: {
        ...TEXT_STYLE.bold,
        width: '80%',
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: appTheme.primaryTextColor,
        textAlign: 'center',
        marginTop: hp(20),
      },
      subHeading: {
        ...TEXT_STYLE.regular,
        width: '80%',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'regular',
        marginTop: hp(20),
        color:appTheme.tertiaryTextColor
      },
      btnContainer: {
        height: hp(48),
        width: '100%',
        backgroundColor: appTheme.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(50),
      },
      btnText: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        fontWeight: 'medium',
        color: appTheme.primaryBackground,
        textTransform: 'capitalize',
      },
      loginContainer:{
        marginTop:hp(30)
      }
    });
  }, [hp, wp]);
  return (
    <MainContainer>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require('../../../assets/images/getStartedImage.png')}
        />
      </View>
      <Text style={styles.heading}>{appLang.increaseyourskill}</Text>
      <Text style={styles.subHeading}>{appLang.lorem}
        
      </Text>
      
      <View style={styles.loginContainer}>
        <MainButton
          onPress={handleSwitch}
          buttonText={appLang.getstart}
          isLoading={loading}
        />
        </View>
    </MainContainer>
  );
};

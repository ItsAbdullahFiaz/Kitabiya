import {StyleSheet, Text, TextInput, View, Pressable} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  Header,
  LoginButton,
  MainContainer,
  SocialLogins,
  UserInput,
} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
// import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import {useNavigation} from '@react-navigation/native';
import {FONT, OTHER_COLORS, SCREENS} from '../../../enums';

export const Login = () => {
  const navigation = useNavigation();
  const {hp, wp} = useResponsiveDimensions();
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxPress = () => {
    setChecked(prev => !prev);
  };
  const styles = useMemo(() => {
    return StyleSheet.create({
      contentContainer: {
        marginTop: hp(70),
      },
      // label:{
      //     fontSize:16,
      //     fontWeight:"regular",
      //     fontFamily:"Poppins-Regular",
      //     textTransform:"capitalize",
      //     color:"#1B1B1B",
      // },
      // input:{
      //     height:hp(48),
      //     borderRadius:hp(8),
      //     borderWidth:0.5,
      //     borderColor:"#E6E6E6",
      //     paddingLeft:hp(20)
      // },
      // inputContainer:{
      //     marginTop:hp(20)
      // },
      checkbox: {
        width: hp(18),
        height: hp(18),
        marginRight: hp(10),
      },
      flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(20),
      },
      rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      rememberText: {
        fontSize: 12,
        fontWeight: 'regular',
        fontFamily: 'Poppins-Regular',
        color: '#1B1B1B',
      },
      dont: {
        fontSize: 14,
        fontWeight: 'regular',
        fontFamily: 'Poppins-Regular',
        color: '#838383',
        marginRight: hp(5),
      },
      dontContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(20),
      },
    });
  }, [FONT, OTHER_COLORS, hp, wp]);
  return (
    <MainContainer>
      <Header title="log in" />
      <View style={styles.contentContainer}>
        <UserInput label="email" />
        <UserInput label="password" />
        <View style={styles.flexContainer}>
          <View style={styles.rememberContainer}>
            <Pressable onPress={handleCheckboxPress} style={styles.checkbox}>
              {/* <AnimatedCheckbox
                checked={checked}
                highlightColor="#09CA67"
                checkmarkColor="#ffffff"
                boxOutlineColor="#09CA67"
              /> */}
            </Pressable>
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <Text
            style={[styles.rememberText, {color: '#838383'}]}
            onPress={() =>
              navigation.navigate(SCREENS.FORGOT_PASSWORD as never)
            }>
            Forgot Password ?
          </Text>
        </View>
        <LoginButton title="log in" onPress={() => console.warn('Pressed')} />
        <SocialLogins />
        <View style={styles.dontContainer}>
          <Text style={styles.dont}>Don't have an account?</Text>
          <Text style={[styles.dont, {color: '#007dfc'}]}>Register</Text>
        </View>
      </View>
    </MainContainer>
  );
};

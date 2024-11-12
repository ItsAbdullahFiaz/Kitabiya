import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useResponsiveDimensions } from '../hooks'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import { STACK } from '../enums';

export const SocialLogins = () => {
  const navigation = useNavigation<any>();
  const { hp, wp } = useResponsiveDimensions();
  const [loading, setLoading] = useState(false);

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw new Error('Something went wrong obtaining access token');
        }
        const credential = auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
        await auth().signInWithCredential(credential);
        console.log('Login success');
        navigation.dispatch(StackActions.replace(STACK.MAIN as never));
      }
    } catch (error) {
      console.log('Login fail with error: ' + error);
    }
    finally {
      setLoading(false); // Hide the loading indicator after the process
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { idToken } = (await GoogleSignin.signIn()).data;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      if (userCredential.user) {
        navigation.dispatch(StackActions.replace(STACK.MAIN as never));
      }
    } catch (error) {
      console.error('Login failed with error: ', error);
    } finally {
      setLoading(false); // Hide the loading indicator after the process
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1070998124660-c9i2ni7s1itl0t1hv4k3h1076fks2u54.apps.googleusercontent.com',
    });
  }, []);
  const styles = useMemo(() => {
    return StyleSheet.create({
      lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(40),
      },
      line: {
        flex: 1,
        height: 0.5,
        backgroundColor: '#838383',
      },
      text: {
        marginHorizontal: 10,
        color: '#838383',
        textTransform: "capitalize"
      },
      socialBtnContainer: {
        flexDirection: "row",
        height: hp(48),
        borderWidth: 0.3,
        borderColor: "#838383",
        borderRadius: hp(8),
        justifyContent: "center",
        alignItems: "center",
      },
      btnIcon: {
        width: hp(24),
        height: hp(24),
        marginRight: hp(10)
      },
      socialBtnText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
        textTransform: "capitalize",
        fontFamily: "Poppins-Regular"
      },
      loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      },
    })
  }, [])
  return (
    <View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>or</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.socialBtnContainer} onPress={handleGoogleLogin}>
        <Image style={styles.btnIcon} source={require("../assets/images/google.png")} />
        <Text style={styles.socialBtnText}>continue with google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialBtnContainer, { marginTop: 20 }]} onPress={handleFacebookLogin}>
        <Image style={styles.btnIcon} source={require("../assets/images/facebook.png")} />
        <Text style={styles.socialBtnText}>continue with facebook</Text>
      </TouchableOpacity>
    </View>
  )
}
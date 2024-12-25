import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { useResponsiveDimensions } from '../hooks'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZE, SCREENS, STACK } from '../enums';
import { AppDataContext, useAuth } from '../context';
import firestore from '@react-native-firebase/firestore';
import { resetAndGo, tokenManager } from '../utils';
import { profileService } from '../services/profileService';

export const SocialLogins = () => {
  const { appTheme, appLang } = useContext(AppDataContext);
  const navigation = useNavigation<any>();
  const { hp, wp } = useResponsiveDimensions();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSocialLoginSuccess = async (userCredential: any) => {
    try {
      const user = userCredential.user;
      const normalizedEmail = user.email.toLowerCase().trim();

      // Get user token
      const token = await user.getIdToken();
      tokenManager.setToken(token);

      // Check if user exists in Firestore
      const userQuery = await firestore()
        .collection('users')
        .where('email', '==', normalizedEmail)
        .get();

      // Create new user profile if doesn't exist
      if (userQuery.empty) {
        const newUserData = {
          email: normalizedEmail,
          userName: user.displayName || normalizedEmail.split('@')[0],
          fcmToken: '',
          createdAt: firestore.FieldValue.serverTimestamp()
        };

        await firestore()
          .collection('users')
          .doc(normalizedEmail)
          .set(newUserData);
      }

      // Fetch profile data
      const profileResponse = await profileService.fetchUserProfile();
      if (!profileResponse.success) {
        console.warn('Failed to fetch social login profile data:', profileResponse.error);
        return;
      }

      // Login user with profile data
      const profile = profileResponse.data || {};
      login(
        profile.name || user.displayName || '',
        normalizedEmail,
        token,
        profile.phoneNumber || '',
        profile.location || '',
        profile.dateOfBirth || '',
        profile.photoUrl || user.photoURL || '',
        profile.isQuestionnaireCompleted || false
      );

      if (profile.isQuestionnaireCompleted) {
        resetAndGo(navigation, STACK.MAIN, null);
      } else {
        resetAndGo(navigation, SCREENS.FIRSTQUESTION, null);
      }

    } catch (error) {
      console.error('Error handling social login:', error);
      throw error;
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('Login cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      const response = await fetch(
        `https://graph.facebook.com/me?fields=email,name&access_token=${data.accessToken}`
      );
      const userInfo = await response.json();
      console.log('Facebook user info:', userInfo);

      const credential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const userCredential = await auth().signInWithCredential(credential);

      if (!userCredential.user.email && userInfo.email) {
        await userCredential.user.updateEmail(userInfo.email);
      }

      await handleSocialLoginSuccess(userCredential);
    } catch (error) {
      console.log('Login fail with error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.configure({
        webClientId: '1070998124660-c9i2ni7s1itl0t1hv4k3h1076fks2u54.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();

      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        accessToken
      );

      const userCredential = await auth().signInWithCredential(credential);
      await handleSocialLoginSuccess(userCredential);
    } catch (error) {
      console.error('Google Login failed with error: ', error);
    } finally {
      setLoading(false);
    }
  };

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
        backgroundColor: appTheme.tertiaryTextColor,
      },
      text: {
        marginHorizontal: 10,
        color: appTheme.tertiaryTextColor,
        textTransform: "capitalize"
      },
      socialBtnContainer: {
        flexDirection: "row",
        height: hp(48),
        borderWidth: 0.3,
        borderColor: appTheme.tertiaryTextColor,
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
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
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
  }, [hp, wp])
  return (
    <View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>{appLang.or}</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.socialBtnContainer} onPress={handleGoogleLogin}>
        <Image style={styles.btnIcon} source={require("../assets/images/google.png")} />
        <Text style={styles.socialBtnText}>{appLang.continuegoogle}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialBtnContainer, { marginTop: 20 }]} onPress={handleFacebookLogin}>
        <Image style={styles.btnIcon} source={require("../assets/images/facebook.png")} />
        <Text style={styles.socialBtnText}>{appLang.continuefacebook}</Text>
      </TouchableOpacity>
    </View>
  )
}
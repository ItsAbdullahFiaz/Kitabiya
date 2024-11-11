import auth from '@react-native-firebase/auth';
import { STACK } from '../enums';
import { resetAndGo } from '../utils';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const registerUser = async (email: string, password: string) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
        return { success: true };
    } catch (error: any) {
        console.log(error)
        let errorMessage = 'An error occurred. Please try again.';

        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'That email address is already in use!';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'That email address is invalid!';
        }

        return { success: false, errorMessage };
    }
};

const loginUser = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        return { success: true };
    } catch (error: any) {
        console.log(error.code)
        let errorMessage = 'An error occurred. Please try again.';

        if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Invalid email or password';
        } else {
            errorMessage = 'Failed to sign in user!';
        }

        return { success: false, errorMessage };
    }
};

const signOutUser = async (navigation: any) => {
    try {
        await auth().signOut();
        console.log('User signed out!');
        resetAndGo(navigation, STACK.AUTH, null);
    } catch (error) {
        console.error('Error signing out user:', error);
    }
};

const resetPassword = async (email: string) => {
    try {
        await auth().sendPasswordResetEmail(email);
        return { success: true };
    } catch (error) {
        console.error('Error sending password reset email:', error);
        let errorMessage = 'An error occurred. Please try again.';
        return { success: false, errorMessage };
    }
};
const handleGoogleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      if (userCredential.user) {
        // navigation.navigate('Welcome');
        return { success: true };
      }
    } catch (error) {
      console.error('Login failed with error: ', error);
    }
  };
  

export { registerUser, loginUser, signOutUser, resetPassword,handleGoogleLogin };
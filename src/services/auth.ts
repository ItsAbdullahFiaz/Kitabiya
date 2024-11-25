import auth from '@react-native-firebase/auth';
import { STACK } from '../enums';
import { resetAndGo } from '../utils';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const registerUser = async (email: string, password: string) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
        const token = await getAuthToken(true);
        return { success: true, token };
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
        const token = await getAuthToken(true);
        return { success: true, token };
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

const getAuthToken = async (forceRefresh = false): Promise<string | null> => {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            console.log('No user is currently signed in');
            return null;
        }

        const token = await currentUser.getIdToken(forceRefresh);
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

export { registerUser, loginUser, signOutUser, resetPassword, getAuthToken };
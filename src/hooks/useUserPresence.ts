import { useEffect } from 'react';
import { AppState } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const useUserPresence = () => {
    console.log("USERPRESENCE_RUNNING");
  useEffect(() => {
    const user = auth().currentUser;

    if (!user) return;

    const userRef = firestore().collection('presence').doc(user?.email);

    const setOnline = async () => {
      await userRef.set({ online: true, lastActive: firestore.FieldValue.serverTimestamp() }, { merge: true });

      // Update Firestore to set offline on app disconnect
      firestore()
        .collection('presence')
        .doc(user.uid)
        .onDisconnect()
        .set({ online: false, lastActive: firestore.FieldValue.serverTimestamp() }, { merge: true });
    };

    const setOffline = async () => {
      await userRef.set({ online: false, lastActive: firestore.FieldValue.serverTimestamp() }, { merge: true });
    };

    // Monitor app state changes
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        setOnline();
      } else {
        setOffline();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    // Set user online on mount
    setOnline();

    // Clean up on unmount
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      setOffline();
    };
  }, []);
};

export default useUserPresence;

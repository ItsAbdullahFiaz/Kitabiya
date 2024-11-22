import messaging from '@react-native-firebase/messaging';

export const subscribeToTopics = async () => {
    try {
        await messaging().subscribeToTopic('all-users');
        console.log('Subscribed to "all-users" topic');
    } catch (error) {
        console.error('Error subscribing to topic:', error);
    }
};

export const unsubscribeFromTopics = async () => {
    try {
        await messaging().unsubscribeFromTopic('all');
        console.log('Unsubscribed from "all" topic');
    } catch (error) {
        console.error('Error unsubscribing from topic:', error);
    }
}; 
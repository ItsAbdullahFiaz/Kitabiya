import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useMemo,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {AnyIcon, IconType, MainContainer} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
import {FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE} from '../../../enums';
import {AppDataContext} from '../../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export const MessagesScreen = () => {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState([]);
  const [emailId, setEmailId] = useState('');
  const {appTheme, appLang} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('MESSAGE_LIST');
      const currentUser = savedUser ? JSON.parse(savedUser) : [];
      console.log('MSG_USERS===>', currentUser);
      const uniqueUsers = currentUser.filter(
        (user: any, index: any, self: any) =>
          index === self.findIndex((u: any) => u.email === user.email),
      );
      setUsers(uniqueUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  const getCurrentUser = async () => {
    try {
      let res = await auth().currentUser;
      setEmailId(res?.email);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleDeleteUser = (userEmail: any, userName: any) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete '${userName}'?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const savedUser = await AsyncStorage.getItem('MESSAGE_LIST');
              const currentUser = savedUser ? JSON.parse(savedUser) : [];
              const updatedUsers = currentUser.filter(
                (currentUser: any) => currentUser.email !== userEmail,
              );
              await AsyncStorage.setItem(
                'MESSAGE_LIST',
                JSON.stringify(updatedUsers),
              );
              setUsers(updatedUsers);

              console.log(`User with email ${userName} deleted successfully`);
            } catch (error: any) {
              console.log('Error deleting user:', error.message);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      title: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h1),
        color: appTheme.primaryTextColor,
        textAlign: 'center',
        textTransform: 'capitalize',
      },
      searchContainer: {
        marginTop: hp(20),
        height: hp(40),
        width: '100%',
        borderRadius: hp(12),
        backgroundColor: appTheme.secondaryBackground,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: hp(10),
      },
      input: {
        height: '100%',
        marginTop: hp(5),
        paddingTop: hp(5),
        color: appTheme.secondaryTextColor,
      },
      listContainer: {},
      card: {
        marginTop: hp(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      firstContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      imgContainer: {
        height: hp(60),
        width: hp(60),
        borderRadius: hp(30),
        overflow: 'hidden',
      },
      img: {
        width: '100%',
        height: '100%',
      },
      name: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.secondaryTextColor,
        textTransform: 'capitalize',
      },
      textContainer: {
        marginLeft: hp(10),
      },
      text: {
        ...TEXT_STYLE.regular,
        fontSize: FONT_SIZE.h3,
        color: appTheme.secondaryText,
      },
      numContainer: {
        height: hp(24),
        width: hp(24),
        borderRadius: hp(12),
        backgroundColor: OTHER_COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
      },
      numberOfMessages: {
        ...TEXT_STYLE.regular,
        fontSize: FONT_SIZE.h4,
        color: appTheme.primaryBackground,
      },
    });
  }, [hp, wp]);

  return (
    <MainContainer>
      <Text style={styles.title}>{appLang.message}</Text>
      <View style={styles.searchContainer}>
        <AnyIcon
          type={IconType.EvilIcons}
          name="search"
          color={appTheme.tertiaryTextColor}
          size={16}
        />
        <TextInput
          style={styles.input}
          placeholder={appLang.Searchhere}
          placeholderTextColor={appTheme.tertiaryTextColor}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          renderItem={({item, index}: any) => {
            console.log('USER_ITEM===>', item);
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate(SCREENS.CHAT as never, {
                    data: item,
                    emailId: emailId,
                  })
                }
                onLongPress={() => handleDeleteUser(item.email, item.userName)}>
                <View style={styles.firstContainer}>
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.img}
                      source={require('../../../assets/images/user.png')}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.userName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainContainer>
  );
};

import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { FONT_SIZE, TEXT_STYLE } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';
import { AppDataContext, useAuth } from '../../../../context';
import UserAvatar from 'react-native-user-avatar';
import { getColorByFirstLetter } from '../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon component

export const ProfileHeader = () => {
  const { appTheme } = useContext(AppDataContext);
  const { authState } = useAuth();
  const { hp, wp } = useResponsiveDimensions();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const styles = useMemo(() => {
    return StyleSheet.create({
      profileHeader: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(20),
      },
      imgContainer: {
        height: hp(88),
        width: hp(88),
        borderRadius: hp(44),
        backgroundColor: appTheme.disabled,
        overflow: 'hidden',
      },
      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      name: {
        ...TEXT_STYLE.medium,
        marginTop: hp(5),
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.secondaryTextColor,
        textTransform: 'capitalize',
      },
      gmail: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.tertiaryTextColor,
      },
      modalContainer: {
        flex: 1,
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalImage: {
        width: '100%',
        height: '60%',
        resizeMode: 'contain',
      },
      backButton: {
        position: 'absolute',
        top: hp(12),
        left: wp(10),
        padding: hp(2),
        zIndex: 1,
      },
      backButtonText: {
        color: 'white',
        fontSize: hp(FONT_SIZE.h3),
      },
      imagemodal:{ justifyContent: 'center',
         alignItems: 'center',
         width:"100%",
         height:"70%",
         
         
         }
    });
  }, [hp, wp, appTheme]);

  return (
    <>
      {authState ? (
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={() => setIsModalVisible(true)}
          >
            {authState.profilePhoto === null || authState.profilePhoto === "" ? (
              <UserAvatar
                style={styles.img}
                size={50}
                name={authState.userName}
                bgColor={getColorByFirstLetter(authState.userName)}
              />
            ) : (
              <Image
                style={styles.img}
                source={{ uri: authState.profilePhoto }}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{authState.userName}</Text>
          <Text style={styles.gmail}>{authState.email}</Text>

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View
              style={styles.modalContainer}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setIsModalVisible(false)} 
              >
                <Icon name="arrow-back" size={30} color="white" /> 
              </TouchableOpacity>

              <View style={styles.imagemodal}>
                {authState.profilePhoto === null || authState.profilePhoto === "" ? (
                  <UserAvatar
                    style={styles.modalImage}
                    size={200}
                    name={authState.userName}
                    bgColor={getColorByFirstLetter(authState.userName)}
                  />
                ) : (
                  <Image
                    style={styles.modalImage}
                    source={{ uri: authState.profilePhoto }}
                  />
                )}
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

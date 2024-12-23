import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Header, MainButton, MainContainer } from '../../../components';
import { useResponsiveDimensions } from '../../../hooks';
import { AppDataContext, useAuth } from '../../../context';
import { FONT_SIZE, SCREENS, TEXT_STYLE } from '../../../enums';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { BookDescription, SwiperComponent } from './components'

export const BookDetailScreen = ({ route }: any) => {
  const [item, setItem] = useState({});
  const navigation = useNavigation<any>();
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang } = useContext(AppDataContext);
  const data = route?.params?.product;
  console.log('Book_Details_Data===>', data)
  const { authState } = useAuth();

  useEffect(() => {
    const chatCredentials = async () => {
      try {
        const incomingUserData = await firestore()
          .collection('users')
          .doc(data?.userId.email)
          .get();
        setItem({
          email: data?.userId.email,
          userName: incomingUserData?.data()?.userName,
        });
      } catch (error: any) {
        console.log(error.message);
      }
    };
    chatCredentials();
  }, []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      bottomContent: {
        marginTop: hp(200),
        paddingBottom: hp(100),
      },
      title: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h1),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
        textAlign: 'center',
      },
      price: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textAlign: 'center',
        marginTop: hp(10),
      },
      descriptionContainer: {
        marginTop: hp(10),
        paddingHorizontal: hp(16),
      },
      descHeading: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h1),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      text: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.primaryTextColor,
      },
      chatBtnContainer: {
        position: 'absolute',
        bottom: hp(20),
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: hp(16),
      },
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer fullWidth={true}>
      <ScrollView>
        <View style={{ height: hp(200), backgroundColor: '#141D2E' }}>
          <View style={{ padding: 16 }}>
            <Header title="book details" lightColor={true} />
          </View>
        </View>
        {/* Swiper Component */}
        <SwiperComponent data={data?.images || []} />
        <View style={styles.bottomContent}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.price}>{`Rs. ${data?.price}`}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descHeading}>condition</Text>
            <Text style={styles.text}>{data?.condition}</Text>
          </View>
          {/* Book Description */}
          <BookDescription description={data?.description} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descHeading}>address</Text>
            <Text style={styles.text}>{data?.location}</Text>
          </View>
        </View>
      </ScrollView>
      {data?.userId?.email !== authState?.email && (
        <View style={styles.chatBtnContainer}>
          <MainButton
            onPress={() =>
              navigation.navigate(SCREENS.CHAT as never, {
                data: item,
                emailId: authState?.email,
              })
            }
            buttonText={appLang.chatnow}
          />
        </View>
      )}
    </MainContainer>
  );
};

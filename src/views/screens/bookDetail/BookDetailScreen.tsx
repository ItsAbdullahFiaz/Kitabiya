import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Header, MainButton, MainContainer} from '../../../components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useResponsiveDimensions} from '../../../hooks';
import {AppDataContext} from '../../../context';
import {FONT_SIZE, SCREENS, TEXT_STYLE} from '../../../enums';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const BookDetailScreen = ({route}: any) => {
  const [item, setItem] = useState({});
  const [emailId, setEmailId] = useState('');
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme, appLang} = useContext(AppDataContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const data = route?.params?.product;
  const shouldShowReadMore = data.description.length > 100;
  console.log('PARAM_DATA_BOOK===>', data);

  const chatCredentials = async () => {
    try {
      const res = await auth().currentUser;
      const incomingUserData = await firestore()
        .collection('users')
        .doc(data?.user.email)
        .get();
      setEmailId(res?.email || '');
      setItem({
        email: data?.user.email,
        userName: incomingUserData?.data()?.userName,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    chatCredentials();
  }, []);

  const toggleText = () => setIsExpanded(!isExpanded);
  const displayText =
    isExpanded || !shouldShowReadMore
      ? data.description
      : `${data.description.slice(0, 200).trim()}... `;

  const styles = useMemo(() => {
    return StyleSheet.create({
      sliderContainer: {
        marginTop: hp(20),
        height: hp(300),
        width: hp(330),
        alignSelf: 'center',
        elevation: 10,
        position: 'absolute',
        top: hp(80),
        zIndex: 1,
      },
      slideContainer: {
        height: hp(300),
        width: hp(330),
        alignSelf: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      bottomContent: {
        marginTop: hp(200),
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
        padding: hp(16),
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
      readMore: {
        ...TEXT_STYLE.regular,
        color: appTheme.interactive,
        fontSize: hp(FONT_SIZE.h4),
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
        <View style={{height: 200, backgroundColor: '#141D2E'}}>
          <View style={{padding: 16}}>
            <Header title="book details" lightColor={true} />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <SwiperFlatList
            data={data?.images}
            renderItem={({item}) => (
              <View style={styles.slideContainer}>
                <Image
                  style={styles.image}
                  resizeMode={'cover'}
                  source={{uri: item}}
                />
              </View>
            )}
            onChangeIndex={({index}) => setActiveIndex(index)}
          />
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.price}>{`Rs. ${data?.price}`}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descHeading}>description</Text>
            <Text style={styles.text}>
              {displayText}
              {!isExpanded && shouldShowReadMore && (
                <Text onPress={toggleText} style={styles.readMore}>
                  {appLang.Readmore}
                </Text>
              )}
              {isExpanded && shouldShowReadMore && (
                <Text onPress={toggleText} style={styles.readMore}>
                  {appLang.Showless}
                </Text>
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.chatBtnContainer}>
        <MainButton
          onPress={() =>
            navigation.navigate(SCREENS.CHAT as never, {data: item, emailId})
          }
          buttonText={appLang.chatnow}
        />
      </View>
    </MainContainer>
  );
};

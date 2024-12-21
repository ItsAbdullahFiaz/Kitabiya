import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  AnyIcon,
  Header,
  IconType,
  MainButton,
  MainContainer,
} from '../../../components';
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
  const swiperRef = React.useRef(null); // Ref for SwiperFlatList

  useEffect(() => {
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
    chatCredentials();
  }, []);

  const toggleText = () => setIsExpanded(!isExpanded);
  const displayText =
    isExpanded || !shouldShowReadMore
      ? data.description
      : `${data.description.slice(0, 200).trim()}... `;

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      swiperRef.current.scrollToIndex({index: activeIndex - 1});
    }
  };

  const handleNext = () => {
    if (activeIndex < data?.images?.length - 1) {
      setActiveIndex(activeIndex + 1);
      swiperRef.current.scrollToIndex({index: activeIndex + 1});
    }
  };

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
      arrowButton: {
        position: 'absolute',
        top: '45%',
        height: hp(30),
        width: hp(30),
        zIndex: 2,
        paddingBottom: hp(10),
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
      },
      leftArrow: {
        left: -30,
      },
      rightArrow: {
        right: -30,
      },
      arrowText: {
        color: '#fff',
        fontSize: 20,
      },
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
      paginationContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -8,
      },
      paginationStyleItem: {
        width: hp(12),
        height: hp(12),
        borderRadius: 6,
        marginHorizontal: hp(5),
      },
      activeDot: {
        backgroundColor: 'white',
      },
      inactiveDot: {
        backgroundColor: 'gray',
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
            ref={swiperRef}
            data={data?.images}
            renderItem={({item}) => (
              <View style={styles.slideContainer}>
                <ImageBackground
                  style={styles.image}
                  resizeMode={'cover'}
                  source={{uri: item}}
                />
              </View>
            )}
            showPagination
            paginationStyle={styles.paginationContainer}
            paginationStyleItem={styles.paginationStyleItem}
            paginationStyleItemInactive={styles.inactiveDot}
            paginationStyleItemActive={styles.activeDot}
            onChangeIndex={({index}) => setActiveIndex(index)}
          />
          {data?.images?.length > 1 && (
            <>
              <TouchableOpacity
                style={[
                  styles.arrowButton,
                  styles.leftArrow,
                  activeIndex === 0 && {opacity: 0.5},
                ]}
                onPress={handlePrev}
                disabled={activeIndex === 0}>
                <AnyIcon
                  type={IconType.EvilIcons}
                  name="chevron-left"
                  color={appTheme.primaryBackground}
                  size={hp(30)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.arrowButton,
                  styles.rightArrow,
                  activeIndex === data?.images?.length - 1 && {opacity: 0.5},
                ]}
                onPress={handleNext}
                disabled={activeIndex === data?.images?.length - 1}>
                <AnyIcon
                  type={IconType.EvilIcons}
                  name="chevron-right"
                  color={appTheme.primaryBackground}
                  size={hp(30)}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.price}>{`Rs. ${data?.price}`}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descHeading}>condition</Text>
            <Text style={styles.text}>{data?.condition}</Text>
          </View>
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
          <View style={styles.descriptionContainer}>
            <Text style={styles.descHeading}>address</Text>
            <Text style={styles.text}>{data?.location}</Text>
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

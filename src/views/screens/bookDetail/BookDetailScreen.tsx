import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AnyIcon,
  Header,
  IconType,
  MainButton,
  MainContainer,
} from '../../../components';
import { FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE } from '../../../enums';
import { useResponsiveDimensions } from '../../../hooks';
import { AppDataContext } from '../../../context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { apiService } from '../../../services/api';
import { ReportSheet } from '../add/components';
import firestore from '@react-native-firebase/firestore';
import SwiperFlatList from 'react-native-swiper-flatlist';

export const BookDetailScreen = ({ route }: any) => {
  const screenWidth = useWindowDimensions().width;
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const { appTheme, appLang } = useContext(AppDataContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [item, setItem] = useState({});
  const [emailId, setEmailId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleText = () => setIsExpanded(!isExpanded);
  const { hp, wp } = useResponsiveDimensions();
  const data = route?.params?.product;
  console.log('PARAM_DATA_BOOK===>', data);
  const shouldShowReadMore = data.description.length > 100;

  const increseProductView = async () => {
    try {
      const response = await apiService.getProductById(data._id);
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch popular products');
      }
    } catch (error) {
      console.error('Error fetching popular products:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      increseProductView();
    }, []),
  );

  const chatCredentials = async () => {
    try {
      const res = await auth().currentUser;
      const incomingUserData = await firestore()
        .collection('users')
        .doc(data?.userId.email)
        .get();
      // console.log('BOOK_DETAIL_WALA===>', incomingUserData?.data()?.userName);
      setEmailId(res?.email || '');
      setItem({
        email: data?.userId.email,
        userName: incomingUserData?.data()?.userName,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    chatCredentials();
  }, []);

  const displayText =
    isExpanded || !shouldShowReadMore
      ? data.description
      : `${data.description.slice(0, 100).trim()}... `;

  const handleModal = () => {
    setIsModalOpen(false);
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      sliderContainer: {
        marginTop: hp(20),
      },
      starsContainer: {
        flexDirection: 'row',
        marginVertical: hp(5),
      },
      introContainer: {
        marginTop: hp(30),
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      imgContainer: {
        width: hp(101),
        height: hp(152),
        borderRadius: hp(8),
        overflow: 'hidden',
      },
      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      nameContainer: {
        marginLeft: hp(20),
      },
      name: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.secondaryTextColor,
        textTransform: 'capitalize',
      },
      author: {
        ...TEXT_STYLE.regular,
        marginVertical: hp(5),
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.tertiaryTextColor,
        textTransform: 'capitalize',
      },
      price: {
        ...TEXT_STYLE.medium,
        marginVertical: hp(5),
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primary,
      },
      genreContainer: {
        backgroundColor: appTheme.secondaryBackground,
        height: hp(26),
        borderRadius: hp(12),
        marginRight: hp(8),
        paddingHorizontal: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
      },
      free: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h4),
        color: OTHER_COLORS.green,
        textTransform: 'capitalize',
        marginTop: hp(3),
        marginVertical: hp(5),
      },
      genreText: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h5),
        color: appTheme.tertiaryTextColor,
        textTransform: 'capitalize',
      },
      detailsContainer: {
        marginTop: hp(10),
        // paddingBottom: hp(100),
      },
      detailHeading: {
        ...TEXT_STYLE.bold,
        fontSize: hp(30),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      textContainer: {
        marginVertical: hp(10),
      },
      text: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.tertiaryTextColor,
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
      },
      textcentre: {
        justifyContent: 'center',
        textAlign: 'center',
      },
      slideContainer: {
        height: hp(300),
        width: screenWidth,
      },
      image: {
        width: '100%',
        height: '100%',
      },
      paginationContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
      },
      activeDot: {
        backgroundColor: 'white',
      },
      inactiveDot: {
        backgroundColor: 'gray',
      },
      paginationStyleItem: {
        width: hp(12),
        height: hp(12),
        borderRadius: 6,
        marginHorizontal: hp(5),
      },
      locationOuterContainer: {
        marginTop: hp(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      locationInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      border: {
        marginVertical: hp(20),
        width: screenWidth,
        borderBottomWidth: 0.2,
        borderBottomColor: appTheme.tertiaryTextColor,
      },
      detailKey: {
        width: '50%',
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h2),
        color: appTheme.tertiaryTextColor,
      },
      detailProp: {
        width: '50%',
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h2),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
    });
  }, [hp, wp]);

  return (
    <MainContainer fullWidth={true}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header title={appLang.bookdetail} />
      </View>
      <View style={styles.sliderContainer}>
        <SwiperFlatList
          data={data?.images}
          renderItem={({ item }) => (
            <View style={styles.slideContainer}>
              <Image
                style={styles.image}
                resizeMode={'cover'}
                source={{ uri: item }}
              />
            </View>
          )}
          showPagination
          paginationStyle={styles.paginationContainer}
          paginationStyleItem={styles.paginationStyleItem}
          paginationStyleItemInactive={styles.inactiveDot}
          paginationStyleItemActive={styles.activeDot}
          onChangeIndex={({ index }) => setActiveIndex(index)}
        />
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <ScrollView>
          <View style={[styles.detailsContainer, { paddingBottom: hp(100) }]}>
            <Text style={styles.detailHeading}>{`Rs ${data?.price}`}</Text>
            <Text style={[styles.detailHeading, { fontSize: hp(FONT_SIZE.h1) }]}>
              {data?.title}
            </Text>
            <View style={styles.locationOuterContainer}>
              <View style={styles.locationInnerContainer}>
                <AnyIcon
                  type={IconType.EvilIcons}
                  name="location"
                  color={appTheme.primaryTextColor}
                  size={hp(FONT_SIZE.h1)}
                />
                <Text>{data?.locationAddress}</Text>
              </View>
              <Text>{`11/12/2024`}</Text>
            </View>
            <View style={styles.border} />
            <View style={styles.textContainer}>
              <Text
                style={[styles.detailHeading, { fontSize: hp(FONT_SIZE.h1) }]}>
                {appLang.details}
              </Text>
              <View style={styles.detailsContainer}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    height: hp(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: hp(10),
                  }}>
                  <Text style={styles.detailKey}>Type</Text>
                  <Text style={styles.detailProp}>{data?.type}</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: hp(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: hp(10),
                  }}>
                  <Text style={styles.detailKey}>Language</Text>
                  <Text style={styles.detailProp}>{data?.language}</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    height: hp(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: hp(10),
                  }}>
                  <Text style={styles.detailKey}>Condition</Text>
                  <Text style={styles.detailProp}>{data?.condition}</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: hp(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: hp(10),
                  }}>
                  <Text style={styles.detailKey}>Is Deliverable</Text>
                  <Text style={styles.detailProp}>No</Text>
                </View>
              </View>
              <View style={styles.border} />
              <Text
                style={[styles.detailHeading, { fontSize: hp(FONT_SIZE.h1) }]}>
                description
              </Text>
              <Text style={styles.text}>
                {data.description}
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
            <View style={styles.border} />

            <MainButton
              onPress={() => setIsModalOpen(true)}
              buttonText={'Report Ad'}
              dismissiveButton
            />
          </View>
        </ScrollView>
        <View style={styles.chatBtnContainer}>
          <MainButton
            onPress={() =>
              navigation.navigate(SCREENS.CHAT as never, { data: item, emailId })
            }
            buttonText={appLang.chatnow}
          />
        </View>
      </View>
      <Modal visible={isModalOpen}>
        <ReportSheet handleModal={handleModal} product={data} />
      </Modal>
    </MainContainer>
  );
};

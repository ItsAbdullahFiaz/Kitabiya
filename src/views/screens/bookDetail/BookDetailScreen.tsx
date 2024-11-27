import {Image, StyleSheet, Text, View} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Header, MainButton, MainContainer} from '../../../components';
import {FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE} from '../../../enums';
import {useResponsiveDimensions} from '../../../hooks';
import {AppDataContext} from '../../../context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {apiService} from '../../../services/api';

export const BookDetailScreen = ({route}: any) => {
  const navigation = useNavigation<any>();
  const {appTheme, appLang} = useContext(AppDataContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [productById, setProductById] = useState([]);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [emailId, setEmailId] = useState('');
  const toggleText = () => setIsExpanded(!isExpanded);
  const {hp, wp} = useResponsiveDimensions();
  const data = route?.params?.product;
  // console.log('PARAM_DATA_BOOK===>', data);
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
      setEmailId(res?.email);
      setItem({email: data?.user.email, userName: data.user.name});
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    chatCredentials();
  }, []);
  // const fullStars = Math.floor(data.rating);
  // const halfStars = data.rating - fullStars >= 0.5 ? 1 : 0;
  // const emptyStars = 5 - fullStars - halfStars;

  // Truncate the text if needed and add the "Read more" link inline
  const displayText =
    isExpanded || !shouldShowReadMore
      ? data.description
      : `${data.description.slice(0, 100).trim()}... `;

  const styles = useMemo(() => {
    return StyleSheet.create({
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
        marginTop: hp(30),
      },
      detailHeading: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
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
    });
  }, [hp, wp]);

  return (
    <MainContainer>
      <Header title={appLang.bookdetail} />
      <View style={styles.introContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: data.images[0]}}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{data.title}</Text>
          {/* <Text style={styles.author}>{data.author}</Text> */}
          {/* <View style={styles.starsContainer}>
            {[...Array(fullStars)].map((_, index) => (
              <AnyIcon
                type={IconType.FontAwesome}
                key={index}
                name="star"
                size={hp(FONT_SIZE.h6)}
                color={OTHER_COLORS.yellow}
              />
            ))}
            {halfStars === 1 && (
              <AnyIcon
                type={IconType.FontAwesome}
                name="star-half"
                size={hp(FONT_SIZE.h6)}
                color={OTHER_COLORS.yellow}
              />
            )}
            {[...Array(emptyStars)].map((_, index) => (
              <AnyIcon
                type={IconType.FontAwesome}
                name="star-o"
                size={hp(FONT_SIZE.h6)}
                color={OTHER_COLORS.yellow}
              />
            ))}
          </View> */}
          {data.price > 0 ? (
            <Text style={styles.price}>{`$${data.price}`}</Text>
          ) : (
            <Text style={styles.free}>{appLang.free}</Text>
          )}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {data.category.map((item: any, index: any) => {
              return (
                <View key={index} style={styles.genreContainer}>
                  <Text style={styles.genreText}>{item}</Text>
                </View>
              );
            })}
          </View> */}
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailHeading}>{appLang.details}</Text>
        <View style={styles.textContainer}>
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
      </View>
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

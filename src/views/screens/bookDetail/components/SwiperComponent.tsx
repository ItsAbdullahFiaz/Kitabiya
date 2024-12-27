import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo, useRef, useState } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { AnyIcon, IconType } from '../../../../components';
import { useResponsiveDimensions } from '../../../../hooks';
import { AppDataContext } from '../../../../context';

interface HeaderProps {
  data: string[];
}

export const SwiperComponent = (props: HeaderProps) => {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme } = useContext(AppDataContext);
  const swiperRef = useRef<SwiperFlatList>(null);

  const handlePrev = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      swiperRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
        viewPosition: 0
      });
    }
  };

  const handleNext = () => {
    if (activeIndex < data.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      swiperRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
        viewPosition: 0
      });
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
        overflow: 'visible',
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
      paginationContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -8,
      },
      paginationStyleItem: {
        width: hp(10),
        height: hp(10),
        borderRadius: hp(5),
        marginHorizontal: hp(3),
      },
    });
  }, [hp]);

  return (
    <View style={styles.sliderContainer}>
      <SwiperFlatList
        ref={swiperRef}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.slideContainer}>
            <ImageBackground
              style={styles.image}
              resizeMode={'contain'}
              source={{ uri: item }}
              defaultSource={require('../../../../assets/images/appLogo.png')}
            />
          </View>
        )}
        showPagination
        paginationStyle={styles.paginationContainer}
        paginationStyleItem={styles.paginationStyleItem}
        paginationActiveColor="white"
        paginationDefaultColor="gray"
        onChangeIndex={({ index }) => setActiveIndex(index)}
        index={activeIndex}
        snapToInterval={hp(330)}
        decelerationRate={0.9}
        snapToAlignment="center"
        viewabilityConfig={{
          itemVisiblePercentThreshold: 60
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        windowSize={1}
        removeClippedSubviews={true}
        getItemLayout={(_, index) => ({
          length: hp(330),
          offset: hp(330) * index,
          index,
        })}
      />
      {data?.length > 1 && (
        <>
          <TouchableOpacity
            style={[
              styles.arrowButton,
              styles.leftArrow,
              activeIndex === 0 && { opacity: 0.5 },
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
              activeIndex === data.length - 1 && { opacity: 0.5 },
            ]}
            onPress={handleNext}
            disabled={activeIndex === data.length - 1}>
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
  );
};

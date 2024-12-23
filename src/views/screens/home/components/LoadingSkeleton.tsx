import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {MainContainer, SkeletonLoader} from '../../../../components';
import {useResponsiveDimensions} from '../../../../hooks';
import {AppDataContext} from '../../../../context';

export const LoadingSkeleton = () => {
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme} = useContext(AppDataContext);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      card: {
        height: hp(280),
        width: wp(170),
        borderRadius:hp(8),
        borderColor: appTheme.borderDefault,
        borderWidth:0.5,
        padding: 5,
        marginBottom:hp(5)
      },
      textContainer: {
        width: '100%',
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      userName: {
        height: hp(30),
        width: hp(150),
        marginBottom: hp(3),
      },
      title: {
        height: hp(30),
        width: hp(200),
        marginBottom: hp(2),
      },
      image: {width: '100%', height: hp(190), marginBottom: 3},
      imagetitle: {height: hp(20), width: '50%', marginBottom: 3},
      imagetext: {height: hp(20), width: '60%', marginBottom: 3},
      imageprice: {height: hp(20), width: '40%', marginBottom: 3},
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.userName}>
          <SkeletonLoader
            width={'100%'}
            height={'100%'}
            borderRadius={10}
            style={{marginBottom: hp(2)}}
          />
        </View>
        <View style={styles.title}>
          <SkeletonLoader
            width={'100%'}
            height={'100%'}
            borderRadius={10}
            style={{marginBottom: hp(2)}}
          />
        </View>
        <View style={{marginTop: hp(10)}}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({item}) => {
              return (
                <View style={styles.card}>
                  <View style={styles.image}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
                  </View>
                  <View style={styles.imagetitle}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
                  </View>
                  <View style={styles.imagetext}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
                  </View>
                  <View style={styles.imageprice}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
                  </View>
                </View>
              );
            }}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
          />
        </View>
      </View>
    </MainContainer>
  );
};

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
        alignItems: 'center',
        backgroundColor: '#A3AAB1', // Adjust color based on your theme
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        marginBottom: hp(5),
        borderWidth: 0.5,
        borderColor: appTheme.disabled,
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
        marginBottom: hp(2),
      },
      title: {
        height: hp(45),
        width: hp(200),
      },
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
                  <SkeletonLoader
                    width={'100%'}
                    height={hp(200)}
                    borderRadius={10}
                    style={{marginBottom: hp(2)}}
                  />
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

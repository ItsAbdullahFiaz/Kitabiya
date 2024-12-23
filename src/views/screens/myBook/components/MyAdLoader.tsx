import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {MainContainer, SkeletonLoader} from '../../../../components';
import {useResponsiveDimensions} from '../../../../hooks';
import {AppDataContext} from '../../../../context';
import {FONT_SIZE, OTHER_COLORS, TEXT_STYLE} from '../../../../enums';

export const MyAdLoader = () => {
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme} = useContext(AppDataContext);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      adContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: appTheme.borderDefault,
        marginTop: hp(10),
        borderRadius: hp(8),
        overflow: 'hidden',
      },
      card: {
        width: '100%',
        height: hp(130),
        padding: hp(10),
      },
      upperContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: appTheme.borderDefault,
      },
      imgContainer: {
        height: hp(80),
        width: hp(80),
        borderRadius: hp(8),
        overflow: 'hidden',
        marginRight: hp(10),
      },
      img: {height: '100%', width: '100%'},
      rightcontainer: {
        height: hp(80),
        width: hp(150),
        padding: hp(5),
      },
      textview: {
        height: hp(20),
        width: hp(60),
        padding: 3,
      },
      textview1: {
        height: hp(20),
        width: hp(70),
        padding: 3,
      },
      textview2: {
        height: hp(20),
        width: hp(150),
        padding: 3,
      },
      bottomview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        height: hp(40),
        width: '100%',
        margin: hp(3),
      },
      bottomtext: {
        height: hp(20),
        width: hp(150),
        
      },
      righttext: {
        height: hp(20),
         width: hp(70), 
      },
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer>
      <View style={{marginTop: hp(3)}}>
        <FlatList
          data={[1, 2, 3]}
          renderItem={({item}) => {
            return (
              <View style={styles.adContainer}>
                <View style={styles.card}>
                  <View style={styles.upperContainer}>
                    <View style={styles.imgContainer}>
                      <View style={styles.img}>
                        <SkeletonLoader
                          width={'100%'}
                          height={'100%'}
                          borderRadius={10}
                          style={{marginBottom: hp(3)}}
                        />
                      </View>
                    </View>
                    <View style={styles.rightcontainer}>
                      <View style={styles.textview}>
                        <SkeletonLoader
                          width={'100%'}
                          height={'100%'}
                          borderRadius={10}
                          style={{marginBottom: hp(3)}}
                        />
                      </View>
                      <View style={styles.textview1}>
                        <SkeletonLoader
                          width={'100%'}
                          height={'100%'}
                          borderRadius={10}
                          style={{marginBottom: hp(3)}}
                        />
                      </View>
                      <View style={styles.textview2}>
                        <SkeletonLoader
                          width={'100%'}
                          height={'100%'}
                          borderRadius={10}
                          style={{marginBottom: hp(3)}}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomview}>
                    <View style={styles.bottomtext}>
                      <SkeletonLoader
                        width={'100%'}
                        height={'100%'}
                        borderRadius={10}
                        style={{marginBottom: hp(3)}}
                      />
                    </View>
                    <View style={styles.righttext}>
                      <SkeletonLoader
                        width={'100%'}
                        height={'100%'}
                        borderRadius={10}
                        style={{marginBottom: hp(3)}}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </MainContainer>
  );
};

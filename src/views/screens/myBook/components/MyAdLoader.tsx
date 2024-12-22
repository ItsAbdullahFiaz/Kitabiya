
import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {MainContainer, SkeletonLoader} from '../../../../components';
import {useResponsiveDimensions} from '../../../../hooks';
import {AppDataContext} from '../../../../context';

export const MyAdLoader = () => {
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme} = useContext(AppDataContext);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      card: {
        height: hp(210),
        width: "100%",
        // alignItems: 'center',
        // backgroundColor: '#A3AAB1', 
        borderRadius: 10,
        shadowColor: '#000',
        padding: 5,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 3,
        marginBottom: hp(5),
        borderWidth: 0.5,
        borderColor: appTheme.disabled,
      },
      upperContainer: {
        flexDirection: 'row',
      },
      imgContainer: {
        height: hp(80),
        width: hp(80),
        borderRadius: hp(8),
        margin:2
      },
      img: {height: '100%', width: '100%'},
      textContainer: {
        height: hp(80),
        width: hp(80),
        borderRadius: hp(8),
        margin:2
      },
      texttitle:{width:50,height:15,margin:3},
     textdetail:{width:70,height:15,margin:3},
     textprice:{width:100,height:15,margin:3},
     mainview:{width:80,height:15,margin:3},
     viewtitle:{width:50,height:15,margin:3},
     active:{width:30,height:15,margin:3},
     button:{width:100,height:20,margin:3}
    });
  }, [hp, wp, appTheme]);

  return (
    <MainContainer>
        <View style={{marginTop: hp(3)}}>
          <FlatList
            data={[1,2,3,]}
            renderItem={({item}) => {
              return (
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
                  <View style={styles.textContainer} > 
                    <View style={styles.texttitle}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
                    </View>
 <View style={styles.textdetail}>
 <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />                   
 </View>
                    <View style={styles.textprice}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
                      </View>
                  </View>
                  </View>
 <View style={styles.mainview}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
   </View>
   <View style={styles.viewtitle}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
   </View>
   <View style={styles.active}>
                    <SkeletonLoader
                      width={'100%'}
                      height={'100%'}
                      borderRadius={10}
                      style={{marginBottom: hp(3)}}
                    />
   </View>
   <View style={styles.button}>
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
          />
        </View>
    </MainContainer>
  );
};

 
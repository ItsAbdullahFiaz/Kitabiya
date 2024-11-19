import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useContext, useEffect, useState} from 'react';
import {AnyIcon, Header, IconType, MainContainer} from '../../../components';
import {useResponsiveDimensions} from '../../../hooks';
import {FONT, FONT_SIZE, SCREENS, TEXT_STYLE} from '../../../enums';
import {AppDataContext} from '../../../context';

export const Notification = () => {
  const {appTheme, appLang} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      title: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h1),
        color: appTheme.primaryTextColor,
        textAlign: 'center',
        textTransform: 'capitalize',
      },
      top: {
        backgroundColor: '#EEEFFC',
        height:72,
        width: 335,
        flexDirection: 'row',
        // paddingVertical:16,
        // paddingHorizontal:14,
        borderWidth: 1,
        borderColor: '#DCDEF9',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textcolor: {
        color: '#11111180',
      },
      textcolor1: {
        color:'#111111',
      },
      incricle: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
       
      },
      incricle0: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        borderColor: '#EEEFFC',
        borderWidth: 1,
      },
      incricle2: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#D2D2D2',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }, [hp, wp]);
  return (
    <MainContainer>
      <Header title="notifications" />
      <View>
        <View style={styles.top}>
         
<View style={{width:275,height:40,flexDirection:"row",}}>
<View style={{width:50, height:40,justifyContent:"center",alignItems:"center",marginHorizontal:8}}>
            <View style={styles.incricle}>
              <View style={styles.incricle0}>
                <Text>hy</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width:213, height:39,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.textcolor1}> User Interface Designer</Text>
              <Text style={styles.textcolor}>
                3 Opportunities in United States
              </Text>
            </View>
          </View>
</View>
          
          <View style={{width:32, height:32,marginRight:10}}>
            <View style={styles.incricle2}>
              <Text>hi</Text>
            </View>
          </View>
        </View>
        </View>
      
    </MainContainer>
  );
};

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useMemo, useContext,} from 'react';
import {AppDataContext} from '../../../../context';
import {useResponsiveDimensions} from '../../../../hooks';
import {FONT_SIZE, TEXT_STYLE,} from '../../../../enums';
export const NotificationComponent = ({
  id,
  title,
  opportunities,
  image,
}: any) => {
  const {appTheme, appLang} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const styles = useMemo(() => {
    return StyleSheet.create({
      top222: {
        backgroundColor: appTheme.quaternaryTextColor,
        height: hp(79),
        width:"100%",
        // width: hp(380),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: appTheme.nboder,
        borderRadius: hp(14),
        alignItems: 'center',
        paddingHorizontal:14,
        paddingVertical:16,
        marginTop: hp(15),
      },
      top1: {
        width: hp(352),
        height: hp(47),
        flexDirection: 'row',
      },
      top2: {
        width: hp(50),
        height: hp(40),
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      top3: {
        width: hp(290),
        height: hp(47),
        paddingLeft:10
        
      },
      textcolor1: {
        ...TEXT_STYLE.medium,
        color:appTheme.black,
        fontSize:FONT_SIZE.h4, 
      },
      textcolor: {
        ...TEXT_STYLE.regular,
        color: appTheme.ngray,
        fontSize:FONT_SIZE.h5,
      },
      
      incricle333: {
        width:hp(40),
        height:hp(40),
        backgroundColor:appTheme.boderc,
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: hp(20),
        borderColor: appTheme.quaternaryTextColor,
        borderWidth: 1,
      },
      incricle222: {
        width: hp(40),
        height: hp(40),
        backgroundColor:appTheme.boderc,
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp(10),
        borderColor: appTheme.quaternaryTextColor,
        borderWidth: 0.5,
      },
      img:
        {width: hp(20), height:hp(20),}
      
    });
  }, [hp, wp]);
  return (
    <View>
      <TouchableOpacity style={styles.top222}>
        <View style={styles.top1}>
          <View style={styles.top2}>
            <View style={styles.incricle222}>
              <View style={styles.incricle333}>
                <Image style={styles.img} source={image} />
              </View>
            </View>
          </View>
          <View style={styles.top3}>
            <View>
              <Text style={styles.textcolor1}>{title}</Text>
              <Text style={styles.textcolor}>{opportunities}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

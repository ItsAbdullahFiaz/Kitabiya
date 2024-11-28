import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useMemo, useContext, } from 'react';
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, TEXT_STYLE, } from '../../../../enums';

interface NotificationProps {
  id: string;
  title: string;
  opportunities: string;
  image?: any;
  timestamp?: string;
  type?: string;
  action?: string;
}

export const NotificationComponent = ({
  id,
  title,
  opportunities,
  image,
  timestamp,
  type,
  action
}: NotificationProps) => {
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme } = useContext(AppDataContext);

  const formattedDate = useMemo(() => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString();
  }, [timestamp]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: appTheme.primaryBackground,
        height: hp(79),
        width: "100%",
        // width: hp(380),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: appTheme.borderDefault,
        borderRadius: hp(14),
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 16,
        marginTop: hp(15),
      },
      row: {
        width: hp(352),
        height: hp(47),
        flexDirection: 'row',
      },
      iconWrapper: {
        width: hp(50),
        height: hp(40),
        justifyContent: 'center',
        alignItems: 'center',

      },
      textWrapper: {
        width: hp(290),
        height: hp(47),
        paddingLeft: 10

      },
      titleText: {
        ...TEXT_STYLE.medium,
        color: appTheme.secondaryTextColor,
        fontSize: FONT_SIZE.h4,
      },
      subtitleText: {
        ...TEXT_STYLE.regular,
        color: appTheme.tertiaryTextColor,
        fontSize: FONT_SIZE.h5,
      },

      outerCircle: {
        width: hp(40),
        height: hp(40),
        backgroundColor: appTheme.secondaryBackground,
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: hp(20),
        borderColor: appTheme.primaryBackground,
        borderWidth: 1,
      },
      innerCircle: {
        width: hp(40),
        height: hp(40),
        backgroundColor: appTheme.secondaryBackground,
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp(10),
        borderColor: appTheme.primaryBackground,
        borderWidth: 0.5,
      },
      icon:
        { width: hp(20), height: hp(20), }

    });
  }, [hp, wp]);
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.innerCircle}>
              <View style={styles.outerCircle}>
                <Image style={styles.icon} source={image} />
              </View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <View>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.subtitleText}>{opportunities}</Text>
              {timestamp && (
                <Text style={styles.subtitleText}>{formattedDate}</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

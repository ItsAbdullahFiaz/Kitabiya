import React, { useContext, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { useResponsiveDimensions } from '../../../../hooks';
import { AppDataContext } from '../../../../context';
import { FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';

interface headerProps {
  handleSetLocation?: any;
  location?: any;
}
export const Address = ({ handleSetLocation, location }: headerProps) => {
  const { appTheme, appLang } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const [searchText, setSearchText] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  const fetchLocation = async () => {
    try {
      setLocationLoading(true);
      Geolocation.getCurrentPosition(info => {
        getLocationName(info.coords.latitude, info.coords.longitude);
      }
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getLocationName = async (latitude: number, longitude: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
      const response = await axios.get(url);
      const address = response.data.name;
      console.log('Location Name:', response.data);
      handleSetLocation(address);
      setLocationLoading(false);
    } catch (error) {
      console.error('Error getting location name:', error);
      setLocationLoading(false);
      return null;
    }
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: hp(15),

      },
      label: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,

      },
      textInput: {
        ...TEXT_STYLE.regular,
        color: appTheme.primaryTextColor,
        fontSize: hp(14),
        height: hp(90),
        width: '100%',
        paddingLeft: hp(5),
        flex: 1,
        textAlignVertical: 'top'
      },
    });
  }, [hp, wp, appTheme]);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>{appLang.address}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write area, city or country"
          style={styles.textInput}
          value={location}
          placeholderTextColor={appTheme.primaryTextColor}
          onChangeText={val => handleSetLocation(val)}

        />
        <TouchableOpacity onPress={fetchLocation} disabled={locationLoading}>
          {locationLoading ? (
            <AnyIcon
              type={IconType.FontAwesome5}
              name="spinner"
              size={20}
              color={appTheme.primary}
              style={{ transform: [{ rotate: '360deg' }] }}
            />
          ) : (
            <AnyIcon
              type={IconType.FontAwesome6}
              name="location-crosshairs"
              size={20}
              color={appTheme.primary}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

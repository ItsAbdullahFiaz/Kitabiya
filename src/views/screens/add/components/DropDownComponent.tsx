import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {AppDataContext} from '../../../../context';
import {useResponsiveDimensions} from '../../../../hooks';
import {FONT_SIZE, OTHER_COLORS, TEXT_STYLE} from '../../../../enums';
import {AnyIcon, Header, IconType, MainContainer} from '../../../../components';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

interface headerProps {
  handleSelectOption: any;
  type: string;
  label: string;
  dropdownItems: any;
  component?: string;
}

export const DropDownComponent = (props: headerProps) => {
  const {handleSelectOption, type, label, dropdownItems, component} = props;
  console.log('COMPONENT===>', component);
  const {appTheme} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (genre: any) => {
    handleSelectOption(genre);
    setIsModalVisible(false);
  };

  const fetchLocation = async () => {
    try {
      Geolocation.getCurrentPosition(info =>
        getLocationName(info.coords.latitude, info.coords.longitude),
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getLocationName = async (latitude: number, longitude: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await axios.get(url);
      const address = response.data.name;
      console.log('Location Name:', address);
      handleSelectOption(address);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error getting location name:', error);
      return null;
    }
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      label: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      title: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
        marginRight: hp(5),
      },
      typeContainer: {
        marginTop: hp(15),
      },
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      dropdownButton: {
        marginTop: component === 'profile' ? hp(5) : hp(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: appTheme.borderDefault,
        paddingHorizontal: 15,
        height: hp(50),
        borderRadius: 5,
        width: '100%',
      },
      buttonText: {
        color: appTheme.primaryTextColor,
        fontSize: hp(FONT_SIZE.h3),
        textTransform: 'capitalize',
      },
      modalContainer: {
        flex: 1,
        backgroundColor: appTheme.primaryBackground,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: hp(16),
      },
      modalTitle: {
        ...TEXT_STYLE.medium,
        fontSize: FONT_SIZE.h3,
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
        marginLeft: hp(20),
      },
      searchContainer: {
        height: hp(50),
        backgroundColor: appTheme.primaryBackground,
        borderRadius: hp(12),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: hp(10),
        marginHorizontal: hp(16),
        borderWidth: 0.5,
        borderColor: appTheme.tertiaryTextColor,
      },
      searchHere: {
        ...TEXT_STYLE.regular,
        fontSize: FONT_SIZE.h5,
        color: appTheme.borderDefault,
        marginLeft: hp(10),
      },
      listContainer: {
        marginVertical: hp(20),
        paddingBottom: hp(100),
      },
      searchOuterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(30),
        paddingHorizontal: hp(10),
      },
      searchInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: OTHER_COLORS.green,
        height: hp(50),
        width: hp(280),
        paddingLeft: hp(10),
      },
      cancelBtn: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h2),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      locationBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: hp(15),
      },
      btnText: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h2),
        color: appTheme.primary,
        marginLeft: hp(10),
      },
    });
  }, [hp, wp]);

  return (
    <View style={styles.typeContainer}>
      {component === 'profile' ? (
        <View style={styles.titleContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      ) : (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{label}</Text>
          <AnyIcon
            type={IconType.FontAwesome5}
            name="star-of-life"
            size={hp(8)}
            color={OTHER_COLORS.red}
          />
        </View>
      )}

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.buttonText}>{type}</Text>
          <AnyIcon
            type={IconType.Ionicons}
            name="chevron-forward"
            size={20}
            color="#000"
          />
        </TouchableOpacity>

        {/* Dropdown Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            {label === 'Location' ? (
              <View
                style={{
                  flex: 1,
                }}>
                <MainContainer>
                  <Header title={label} />
                  <View style={styles.searchOuterContainer}>
                    <View style={styles.searchInnerContainer}>
                      <AnyIcon
                        type={IconType.Ionicons}
                        name="search"
                        size={20}
                        color={appTheme.secondaryTextColor}
                      />
                      <TextInput placeholder="Search area, city or country" />
                    </View>
                    <Text style={styles.cancelBtn}>cancel</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.locationBtnContainer}
                    onPress={fetchLocation}>
                    <AnyIcon
                      type={IconType.FontAwesome6}
                      name="location-crosshairs"
                      size={20}
                      color={appTheme.primary}
                    />
                    <Text style={styles.btnText}>Use current location</Text>
                  </TouchableOpacity>
                </MainContainer>
              </View>
            ) : (
              <>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <AnyIcon
                      type={IconType.Ionicons}
                      name="close-outline"
                      color={appTheme.tertiaryTextColor}
                      size={30}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>choose type</Text>
                </View>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.searchContainer}>
                    <AnyIcon
                      type={IconType.EvilIcons}
                      name="search"
                      color={appTheme.borderDefault}
                      size={20}
                    />
                    <Text style={styles.searchHere}>search here</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.listContainer}>
                  <FlatList
                    data={dropdownItems}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => handleSelect(item)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: hp(16),
                          borderBottomWidth: 0.5,
                          borderBottomColor: appTheme.tertiaryTextColor,
                        }}>
                        <Text
                          style={{
                            fontSize: FONT_SIZE.h3,
                            color: appTheme.primaryTextColor,
                            textTransform: 'capitalize',
                          }}>
                          {item}
                        </Text>
                        {type === item && (
                          <AnyIcon
                            type={IconType.Octicons}
                            name="check"
                            size={20}
                            color={appTheme.tertiaryTextColor}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
};

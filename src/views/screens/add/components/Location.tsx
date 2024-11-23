import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';
import { dropdownItems } from '../../../../utils';

const genres = ['Horror', 'Comedy', 'Fantasy', 'Action', 'Romance', 'Drama'];
export const Location = ({ handleSelectLocation, location }: any) => {
  const { appTheme } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (genre: any) => {
    handleSelectLocation(genre);
    setIsModalVisible(false);
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        marginTop: hp(10),
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
        textTransform: "capitalize"
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
    });
  }, [hp, wp]);

  return (
    <View style={styles.typeContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>location</Text>
        <AnyIcon
          type={IconType.FontAwesome5}
          name="star-of-life"
          size={hp(8)}
          color={OTHER_COLORS.red}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.buttonText}>{location}</Text>
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
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <AnyIcon
                  type={IconType.Ionicons}
                  name="close-outline"
                  color={appTheme.tertiaryTextColor}
                  size={30}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>choose location</Text>
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
                renderItem={({ item }) => (
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
                    {location === item && (
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
          </View>
        </Modal>
      </View>
    </View>
  );
};

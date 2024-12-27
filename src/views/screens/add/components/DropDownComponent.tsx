import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, OTHER_COLORS, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';

interface headerProps {
  handleSelectOption: any;
  type: string;
  label: string;
  dropdownItems: any;
  component?: string;
}

export const DropDownComponent = (props: headerProps) => {
  const { handleSelectOption, type, label, dropdownItems, component } = props;
  const { appTheme, appLang } = useContext(AppDataContext);
  const { hp, wp } = useResponsiveDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSelect = (genre: any) => {
    handleSelectOption(genre);
    setIsModalVisible(false);
  };

  const filteredtype = dropdownItems.filter((item: any) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      label: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      title: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: "capitalize",
        marginBottom: hp(3)
      },
      typeContainer: {
        marginTop: hp(15),
      },
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: appTheme.borderDefault,
        paddingHorizontal: 15,
        height: hp(48),
        borderRadius: 5,
        width: '100%',
      },
      buttonText: {
        color: appTheme.primaryTextColor,
        fontSize: hp(FONT_SIZE.h4),
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
      iconContainer: { paddingBottom: hp(8) },
      input: {
        height: '100%',
        marginTop: hp(5),
        paddingTop: hp(5),
        color: appTheme.secondaryTextColor,
      },
    });
  }, [hp, wp]);

  return (
    <View style={styles.typeContainer}>
      {component === 'profile' ? <Text style={styles.label}>{label}</Text> : <Text style={styles.title}>{label}</Text>}
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
              <Text style={styles.modalTitle}>choose type</Text>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.iconContainer}>
                <AnyIcon
                  type={IconType.EvilIcons}
                  name="search"
                  color={appTheme.tertiaryTextColor}
                  size={hp(30)}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder={appLang.Searchhere}
                placeholderTextColor={appTheme.tertiaryTextColor}
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
              />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={filteredtype}
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
          </View>
        </Modal>
      </View>
    </View>
  );
};

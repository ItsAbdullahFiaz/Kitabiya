import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useRef, useState} from 'react'
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';

const genres = ['Horror', 'Comedy', 'Fantasy', 'Action', 'Romance', 'Drama'];
export const Language = () => {
    const {appTheme} = useContext(AppDataContext);
    const {hp,wp}=useResponsiveDimensions();
    const [selectedGenre, setSelectedGenre] = useState('Choose');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const buttonRef = useRef();
    // Function to handle selection
    const handleSelect = (genre : any) => {
      setSelectedGenre(genre);
      setIsModalVisible(false);
    };
    const openDropdown = () => {
        buttonRef.current.measure((fx, fy, buttonWidth, buttonHeight, px, py) => {
          setDropdownPosition({ x: px, y: py + buttonHeight, width: buttonWidth });
          setIsModalVisible(true);
        });
      };
    
const styles = useMemo(()=>{
    return StyleSheet.create({
        titleContainer:{
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center"
          },
          title:{
            ...TEXT_STYLE.bold,
            fontSize:hp(FONT_SIZE.h3),
            color:appTheme.primaryTextColor,
            textTransform:"capitalize",
            marginRight:hp(5)
        },
        typeContainer:{
            marginTop:hp(15)
          },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          dropdownButton: {
            marginTop:hp(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0.5,
            borderColor: appTheme.grey,
            paddingHorizontal: 15,
            height:hp(50),
            borderRadius: 5,
            width: '100%',
          },
          buttonText: {
            color: appTheme.primaryTextColor,
            fontSize: hp(FONT_SIZE.h3),
          },
          modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          dropdownContainer: {
            width: '80%',
            borderWidth:0.5,
            borderColor:appTheme.tertiaryTextColor,
            borderRadius: hp(8),
            padding: hp(10),
            backgroundColor:appTheme.primaryBackground
          },
          option: {
            paddingVertical: hp(12),
            paddingHorizontal: hp(10),
            borderBottomWidth: 0.2,
            borderBottomColor: appTheme.tertiaryTextColor,
          },
          optionText: {
            color: appTheme.primaryTextColor,
            fontSize: 16,
          },
    })
},[hp,wp])

  return (
    <View style={styles.typeContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>language</Text>
        <AnyIcon 
        type={IconType.FontAwesome5}
        name='star-of-life'
        size={hp(8)}
        color={appTheme.compulsory}
        />
        </View>
        <View style={styles.container}>
      {/* Button to open the dropdown */}
      <TouchableOpacity
        ref={buttonRef}
        style={styles.dropdownButton}
        onPress={openDropdown}
      >
        <Text style={styles.buttonText}>{selectedGenre}</Text>
        <AnyIcon
        type={IconType.Ionicons}
        name='chevron-forward'
        size={hp(20)}
        color={appTheme.primaryTextColor}
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View
            style={[
              styles.dropdownContainer,
              {
                top: dropdownPosition.y,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
              },
            ]}
          >
            <FlatList
              data={genres}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
      </View>
  )
}

import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppDataContext, AppDataProvider} from '../../../../context';
import {FONT_SIZE, TEXT_STYLE} from '../../../../enums';
import {useResponsiveDimensions} from '../../../../hooks';
import {apiService} from '../../../../services/api';

export const ReportSheet = ({handleModal, product}: any) => {
  console.log('product===>', product);
  let productId = product._id;
  const {appTheme,appLang} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const styles = useMemo(() => {
    return StyleSheet.create({
      sheetBtnText: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h1),
        color:appTheme.primaryTextColor,
        marginBottom: hp(2),
      },
      radioButton: {
        height: hp(20),
        width: hp(20),
        borderRadius: hp(10),
        borderWidth: 2,
        borderColor: appTheme.primaryTextColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: hp(10),
      },
      radioButtonSelected: {
        height: hp(10),
        width: hp(10),
        borderRadius: hp(5),
        backgroundColor: appTheme.primaryTextColor,
      },
      optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1.5), 
        paddingVertical:hp(10)
      },
      optionText: {
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.primaryTextColor,
      },
      textInput: {
        height: hp(90),
        width: '100%',
        borderColor: appTheme.primaryTextColor,
        borderWidth: 1,
        paddingHorizontal: hp(10),
        marginTop: hp(2),
        color: appTheme.primaryTextColor,
        fontSize: hp(FONT_SIZE.h4),
        textAlignVertical: 'top',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: hp(2),
      },
      button: {
        width: hp(70),
        height: hp(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(8),
        marginLeft: hp(2),
      },
      buttonText: {
        color:appTheme.primaryTextColor,
        fontSize: hp(FONT_SIZE.h3),
        ...TEXT_STYLE.bold,
      },
    });
  }, [appTheme]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

 
  const handleReportProduct = async () => {
    try {
      const data = {
        reason: selectedOption, 
        description: message, 
      };

      console.log('Payload:', data);

      const response = await apiService.reportProduct(productId, data);

      if (response.error) {
        console.error('Error Reporting:', response.error);
      } else {
        console.log('Product reported successfully:', response);
      }
    } catch (error) {
      console.error('Error reporting product:', error);
    }
  };

  const handleSend = () => {
    if (!selectedOption || !message.trim()) {
      
      Alert.alert(
        'Incomplete Submission',
        'Please select an option and provide a comment before sending.',
        [{text: 'OK'}],
      );
    } else {
      console.log('Selected Option:', selectedOption);
      console.log('Message:', message);

      handleReportProduct();

      Alert.alert(
        'Success',
        'Your comment has been submitted successfully!',
        [{text: 'OK', onPress: () => handleModal(false)}], 
      );
    }
  };

  const handleCancel = () => {
    handleModal(false);
  };

  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['60%']}
        enablePanDownToClose
        onClose={() => {
          handleModal(false);
        }}
        onChange={handleSheetChanges}
        backgroundStyle={{backgroundColor: appTheme.primaryBackground}}>
        <BottomSheetView
          style={{
            flex: 1,
            padding: hp(20),
            
          }}>
          <ScrollView contentContainerStyle={{paddingBottom: hp(2),}}>
            <Text style={styles.sheetBtnText}>{appLang.reportad}</Text>

            {/* Options */}
            {['inappropriate', 'spam', 'fake', 'offensive', 'other'].map(
              option => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionRow}
                  onPress={() =>
                    handleOptionSelect(option)
                  }>
                  <View style={styles.radioButton}>
                    {selectedOption === option && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ),
            )}

            {/* Text Input */}
            <TextInput
              style={styles.textInput}
              placeholder="Comments"
              placeholderTextColor={appTheme.secondaryTextColor}
              value={message}
              onChangeText={setMessage}
              multiline
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button]} onPress={handleCancel}>
                <Text style={styles.buttonText}>{appLang.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button]} onPress={handleSend}>
                <Text style={styles.buttonText}>{appLang.send}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

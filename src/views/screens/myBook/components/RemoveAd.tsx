import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {AppDataContext} from '../../../../context';
import {useResponsiveDimensions} from '../../../../hooks';
import {FONT_SIZE, SCREENS, TEXT_STYLE} from '../../../../enums';
import {apiService} from '../../../../services/api';
import { useNavigation } from '@react-navigation/native';

export const RemoveAd = ({handleRemoveModal, index,product}: any) => {
  const navigation = useNavigation<any>();
  //   console.log('REMOVE_AD_ID===>', index);
  const {appTheme} = useContext(AppDataContext);
  const [loading, setLoading] = useState(false);
  const {hp, wp} = useResponsiveDimensions();
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const deleteProduct = async (index: any) => {
    try {
      setLoading(true);
      const response = await apiService.deleteProduct(index);
      console.log(
        'PRODUCTS_BY_USERID_RESPONSE===>',
        JSON.stringify(response.data),
      );
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch products');
      }
      handleRemoveModal(false);

      // Assuming the API returns products sorted by createdAt
      //   setMyAdsList(response.data || []);
    } catch (error) {
      console.error('Error deleting product:', error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      sheetBtnText: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
      },
      editContainer: {
        height: hp(30),
        width: '50%',
        // borderWidth: 1,
        // borderColor: appTheme.primaryTextColor,
        // borderRadius: hp(5),
        // marginTop: hp(8),
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      edit: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
    });
  }, [appTheme]);
  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['25%']}
        enablePanDownToClose
        onClose={() => {
          handleRemoveModal(false);
        }}
        onChange={handleSheetChanges}
        backgroundStyle={{backgroundColor: '#fff'}}>
        <BottomSheetView
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            padding: 20,
          }}>
             <TouchableOpacity
            style={styles.editContainer}
            onPress={() =>
              navigation.navigate(SCREENS.ADD_SCREEN as never, {
                data: product,
                dataType: 'edit',
              })
            }>
            <Text style={styles.sheetBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteProduct(index)}>
            <Text style={styles.sheetBtnText}>Remove Ad</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveModal(false)}>
            <Text style={styles.sheetBtnText}>Cancel</Text>
          </TouchableOpacity>
         
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

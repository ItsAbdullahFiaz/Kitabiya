import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {AppDataContext} from '../../../../context';
import {useResponsiveDimensions} from '../../../../hooks';
import {FONT_SIZE, TEXT_STYLE} from '../../../../enums';

export const BottomSheetComponent = ({
  handleModal,
  handleCameraLaunch,
  openImagePicker,
}: any) => {
  const {appTheme,appLang} = useContext(AppDataContext);
  const {hp, wp} = useResponsiveDimensions();
  const handleSheetChanges = useCallback((index: number) => {
  }, []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const styles = useMemo(() => {
    return StyleSheet.create({
      sheetBtnText: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
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
          handleModal(false);
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
          <TouchableOpacity onPress={handleCameraLaunch}>
            <Text style={styles.sheetBtnText}>{appLang.takephoto}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openImagePicker}>
            <Text style={styles.sheetBtnText}>{appLang.pickgallery}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleModal(false)}>
            <Text style={styles.sheetBtnText}>{appLang.close}</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

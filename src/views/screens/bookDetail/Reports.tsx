// import React, { useRef } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import BottomSheet from 'reanimated-bottom-sheet';
// import { apiService } from '../../../services/api';

// export const Reports = ({ route }: any) => {
//   const data = route?.params?.product;
//   const sheetRef = useRef(null);

//   const handleReportProduct = async () => {
//     try {
//       const response = await apiService.reportProduct(data?._id);
//       if (!response.error) {
//         console.log('Error Reporting');
//       }
//     } catch (error) {
//       console.error('Error adding to recent searches:', error);
//     }
//   };

//   const renderContent = () => (
//     <View style={styles.bottomSheet}>
//       <Text style={styles.bottomSheetText}>Are you sure you want to report this product?</Text>
//       <TouchableOpacity style={styles.confirmButton} onPress={handleReportProduct}>
//         <Text style={styles.buttonText}>Confirm Report</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.cancelButton} onPress={() => sheetRef.current?.snapTo(1)}>
//         <Text style={styles.buttonText}>Cancel</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.reportButton}
//         onPress={() => sheetRef.current?.snapTo(0)}>
//         <Text style={styles.textreport}>Report</Text>
//       </TouchableOpacity>
      
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={[300, 0]} // Height levels of the Bottom Sheet
//         borderRadius={20}
//         renderContent={renderContent}
//         initialSnap={1} // Initially closed
//       />
//     </View>
//   );
// };

// export default Reports;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   incentre: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   reportButton: {
//     padding: 10,
//     backgroundColor: 'red',
//     borderRadius: 5,
//   },
//   textreport: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   bottomSheet: {
//     backgroundColor: '#fff',
//     padding: 20,
//     height: '100%',
//   },
//   bottomSheetText: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   confirmButton: {
//     backgroundColor: 'red',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   cancelButton: {
//     backgroundColor: 'grey',
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Header, MainContainer } from '../../../components'
import { apiService } from '../../../services/api';

const handleReportProduct = async () => {
  try {
      const response = await apiService.reportProduct(data?._id);

      if (!response.error) {
          // Refresh recent searches list
          console.log("ERRor Reporting")
      }
  } catch (error) {
      console.error('Error adding to recent searches:', error);
  }
};

 export const Reports = ({route}: any) => {
  const data = route?.params?.product;
  console.log('DATA_BOOK===>', data);
  return (
    <MainContainer>
      <Header title="reports"/>
      <View style={styles.incentre}>
          <TouchableOpacity  onPress={handleReportProduct}
          >
            <Text>Report</Text>
          </TouchableOpacity>
        </View>
        </MainContainer>
  )
}

export default Reports

const styles = StyleSheet.create({
  incentre:{
    justifyContent:"center",
    alignItems:"center"
  }
})
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {AnyIcon, IconType, MainContainer} from '../../../components';
import {FONT_SIZE, SCREENS, TEXT_STYLE} from '../../../enums';
import {useResponsiveDimensions} from '../../../hooks';
import {AppDataContext} from '../../../context';
import {apiService} from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertDate } from '../../../utils';
import { RemoveAd } from './components';
import { useNavigation } from '@react-navigation/native';

export const MyBooksScreen = () => {
  const navigation=useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [myAdsList, setMyAdsList] = useState([]);
  const [index,setIndex]=useState<any>("");
  const [isModalVisible,setIsModalVisible]=useState(false);
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme, appLang} = useContext(AppDataContext);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('BACKEND_USERID');
      console.log('USER_ID===>', userId);
      const response = await apiService.getProductsByUser(userId);
      console.log(
        'PRODUCTS_BY_USERID_RESPONSE===>',
        JSON.stringify(response.data),
      );
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch products');
      }

      // Assuming the API returns products sorted by createdAt
      setMyAdsList(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [isModalVisible]);
  const handleOpenModal=(id:any)=>{
    setIndex(id);
    setIsModalVisible(true);
  }
  const handleRemoveModal = (val: any) => {
    setIsModalVisible(val);
  }
  const styles = useMemo(() => {
    return StyleSheet.create({
      title: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h1),
        color: appTheme.primaryTextColor,
        textAlign: 'center',
        textTransform: 'capitalize',
      },
      listContainer: {
        flex:1,
        marginTop:hp(30),
      },
      adContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: appTheme.inputBorder,
        marginTop: hp(10),
        borderRadius: hp(8),
        overflow: 'hidden',
      },
      card: {
        width: '100%',
        height: hp(100),
        backgroundColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: hp(10),
      },
      upperContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      imgContainer: {
        height: hp(80),
        width: hp(80),
        borderRadius: hp(8),
        overflow: 'hidden',
        marginRight: hp(10),
      },
      img: {height: '100%', width: '100%'},
      adTitle:{
        ...TEXT_STYLE.medium,
        fontSize:hp(FONT_SIZE.h3),
        color:appTheme.primaryTextColor
      },
      textContainer:{
        justifyContent:"space-between",
        alignItems:"flex-start",
        height:"100%"
      },
      bottomContainer:{
        padding:hp(10)
      },
      viewsContainer:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
      },
      active:{
        ...TEXT_STYLE.medium,
        fontSize:hp(FONT_SIZE.h3),
        color:appTheme.primaryTextColor,
        backgroundColor:appTheme.green,
        paddingHorizontal:hp(10),
        borderRadius:hp(3),
        width:hp(75)
      },
      editContainer:{
        height:hp(45),
        width:"50%",
        borderWidth:1,
        borderColor:appTheme.primaryTextColor,
        borderRadius:hp(5),
        marginTop:hp(8),
        justifyContent:"center",
        alignItems:"center"
      },
      edit:{
        ...TEXT_STYLE.regular,
        fontSize:hp(FONT_SIZE.h3),
        color:appTheme.primaryTextColor,
        textTransform:"capitalize"
      }
    });
  }, [hp, wp]);
  return (
    <MainContainer>
      <Text style={styles.title}>{appLang.myads}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={myAdsList}
          renderItem={({item}) => {
            console.log('MY_ADS===>', item);
            return (
              <TouchableOpacity style={styles.adContainer}>
                <View style={styles.card}>
                  <View style={styles.upperContainer}>
                    <View style={styles.imgContainer}>
                      <Image
                        style={styles.img}
                        source={{uri: item.images[0]}}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.adTitle}>{item.title}</Text>
                      <Text style={[styles.adTitle,{...TEXT_STYLE.regular}]}>{`Rs ${item.price}`}</Text>
                      <Text style={[styles.adTitle,{...TEXT_STYLE.regular}]}>{item.type}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={()=>handleOpenModal(item._id)}>
                    <AnyIcon
                      type={IconType.SimpleLineIcons}
                      name="options-vertical"
                      size={hp(FONT_SIZE.h1)}
                      color={appTheme.darkBlack}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                <Text style={[styles.adTitle,{...TEXT_STYLE.regular}]}>{`Active from ${convertDate(item.createdAt)}`}</Text>
                <View style={styles.viewsContainer}>
                  <AnyIcon 
                  type={IconType.Ionicons}
                  name='eye-outline'
                  size={hp(FONT_SIZE.h3)}
                  color={appTheme.primaryTextColor}
                  />
                  <Text style={[styles.adTitle,{...TEXT_STYLE.regular,marginLeft:hp(10)}]}>{`0 Views`}</Text>
                </View>
                  <Text style={styles.active}>Active</Text>
                  <TouchableOpacity style={styles.editContainer} onPress={()=>navigation.navigate(SCREENS.ADD_SCREEN as never,{data:item,dataType:"edit"})}>
                    <Text style={styles.edit}>edit</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal visible={isModalVisible} transparent>
          <RemoveAd
            handleRemoveModal={handleRemoveModal}
            index={index}
          />
        </Modal>
    </MainContainer>
  );
};

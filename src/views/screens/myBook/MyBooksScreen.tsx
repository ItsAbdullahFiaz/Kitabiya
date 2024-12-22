import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useMemo, useState, useCallback } from 'react';
import { AnyIcon, IconType, MainContainer } from '../../../components';
import { FONT_SIZE, OTHER_COLORS, SCREENS, TEXT_STYLE } from '../../../enums';
import { useResponsiveDimensions } from '../../../hooks';
import { AppDataContext } from '../../../context';
import { convertDate } from '../../../utils';
import { MyAdLoader, RemoveAd } from './components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMyProducts, useDeleteProduct } from '../../../hooks/useProducts';

export const MyBooksScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectProduct, setSelectProduct] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { hp, wp } = useResponsiveDimensions();
  const { appTheme, appLang } = useContext(AppDataContext);
  const [imageLoading, setImageLoading] = useState({});

  // Use React Query hooks
  const {
    data: myAdsList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useMyProducts();
  console.log('MYADDETAILS===>', myAdsList);

  const deleteProduct = useDeleteProduct();

  const handleOpenModal = (id: string, productData: any) => {
    setSelectedProductId(id);
    setSelectProduct(productData);
    setIsModalVisible(true);
  };

  const handleRemoveModal = async (shouldDelete: boolean) => {
    if (shouldDelete && selectedProductId) {
      try {
        await deleteProduct.mutateAsync(selectedProductId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
    setIsModalVisible(false);
  };

  // Refetch data when screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleImageLoadStart = (index: any) => {
    setImageLoading(prevState => ({ ...prevState, [index]: true }));
  };

  const handleImageLoadEnd = (index: any) => {
    setImageLoading(prevState => ({ ...prevState, [index]: false }));
  };

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
        flex: 1,
        marginTop: hp(30),
      },
      adContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: appTheme.borderDefault,
        marginTop: hp(10),
        borderRadius: hp(8),
        overflow: 'hidden',
      },
      card: {
        width: '100%',
        height: hp(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: hp(10),
        borderBottomWidth: 0.5,
        borderBottomColor: appTheme.borderDefault,
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
      img: { height: '100%', width: '100%' },
      adTitle: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
      },
      textContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%',
      },
      bottomContainer: {
        padding: hp(10),
        flexDirection: "row",
        justifyContent: "space-between"
      },
      viewsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      active: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        backgroundColor: OTHER_COLORS.green,
        paddingHorizontal: hp(10),
        borderRadius: hp(3),
        width: hp(75),
      },
      editContainer: {
        height: hp(45),
        width: '50%',
        borderWidth: 1,
        borderColor: appTheme.primaryTextColor,
        borderRadius: hp(5),
        marginTop: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
      },
      edit: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      adBtnContainer: {
        marginTop: hp(20),
        height: hp(48),
        width: hp(200),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.primary,
        borderRadius: hp(8),
      },
      adBtnText: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        textTransform: 'capitalize',
        color: appTheme.primaryBackground,
      },
    });
  }, [hp, wp]);

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
        <TouchableOpacity
          style={styles.adBtnContainer}
          onPress={() => refetch()}>
          <Text style={styles.adBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return <MyAdLoader />;
  }

  if (!isLoading && myAdsList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No ads here yet!</Text>
        <Text>Start sharing your offers or items today.</Text>
        <TouchableOpacity
          style={styles.adBtnContainer}
          onPress={() => navigation.navigate(SCREENS.ADD_SCREEN)}>
          <Text style={styles.adBtnText}>Post Your First Ad</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <MainContainer>
      <Text style={styles.title}>{appLang.myads}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={myAdsList}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.adContainer}>
              <View style={styles.card}>
                <View style={styles.upperContainer}>
                  <View style={styles.imgContainer}>
                    {imageLoading[index] && (
                      <Image
                        source={require('../../../assets/images/appLogo.png')}
                        style={styles.img}
                        resizeMode={'center'}
                      />
                    )}
                    <Image
                      style={styles.img}
                      source={{ uri: item.images[0] }}
                      onLoadStart={() => handleImageLoadStart(index)}
                      onLoadEnd={() => handleImageLoadEnd(index)}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.adTitle}>{item.title}</Text>
                    <Text style={[styles.adTitle, { ...TEXT_STYLE.regular }]}>
                      {`Rs ${item.price}`}
                    </Text>
                    <Text style={[styles.adTitle, { ...TEXT_STYLE.regular }]}>
                      {item.type}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleOpenModal(item._id, item)}>
                  <AnyIcon
                    type={IconType.SimpleLineIcons}
                    name="options-vertical"
                    size={hp(FONT_SIZE.h1)}
                    color={appTheme.primaryTextColor}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <Text
                  style={[
                    styles.adTitle,
                    { ...TEXT_STYLE.regular },
                  ]}>{`Active from ${convertDate(item.createdAt)}`}</Text>
                <View style={styles.viewsContainer}>
                  <AnyIcon
                    type={IconType.Ionicons}
                    name="eye-outline"
                    size={hp(FONT_SIZE.h3)}
                    color={appTheme.primaryTextColor}
                  />
                  <Text
                    style={[
                      styles.adTitle,
                      { ...TEXT_STYLE.regular, marginLeft: hp(10) },
                    ]}>{`${item.views} ${item.views === 1 ? 'View' : 'Views'}`}</Text>
                </View>
                {/* <TouchableOpacity
                  style={styles.editContainer}
                  onPress={() =>
                    navigation.navigate(SCREENS.ADD_SCREEN as never, {
                      data: item,
                      dataType: 'edit',
                    })
                  }>
                  <Text style={styles.edit}>edit</Text>
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      </View>
      <Modal visible={isModalVisible} transparent>
        <RemoveAd
          handleRemoveModal={handleRemoveModal}
          index={selectedProductId}
          product={selectProduct}
        />
      </Modal>
    </MainContainer>
  );
};

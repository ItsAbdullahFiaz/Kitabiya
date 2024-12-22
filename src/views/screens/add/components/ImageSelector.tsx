import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {AnyIcon, IconType} from '../../../../components';
import {useResponsiveDimensions} from '../../../../hooks';
import {AppDataContext} from '../../../../context';
import {FONT_SIZE, OTHER_COLORS, TEXT_STYLE} from '../../../../enums';
import {Instructions} from '../../../../components/unused';

export const ImageSelector = ({
  imagesList,
  handleImageSelectorModal,
  handleOpenAndDelete,
}: any) => {
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme} = useContext(AppDataContext);
  const styles = useMemo(() => {
    return StyleSheet.create({
      categoryContainer: {
        marginTop: hp(30),
      },
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
      booksContainer: {
        marginTop: hp(15),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      imgContainer: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        overflow: 'hidden',
        marginRight: hp(10),
      },
      img: {
        height: '100%',
        width: '100%',
      },
      booksHeading: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primaryTextColor,
      },
      books: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.tertiaryTextColor,
      },
      uploadContainer: {
        marginTop: hp(10),
        width: '100%',
        height: hp(252),
        borderWidth: 0.5,
        borderColor: appTheme.borderDefault,
        borderRadius: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
      },
      imagesContainer: {
        padding: hp(16),
        marginTop: hp(10),
        width: '100%',
        height: hp(152),
        borderWidth: 0.5,
        borderColor: appTheme.borderDefault,
        borderRadius: hp(8),
        justifyContent: 'space-between',
      },
      dummyImg: {
        width: hp(150),
        height: hp(80),
      },
      btnContainer: {
        marginVertical: hp(10),
        height: hp(44),
        paddingHorizontal: hp(18),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: appTheme.primary,
        borderRadius: hp(8),
      },
      btnText: {
        ...TEXT_STYLE.medium,
        fontSize: hp(FONT_SIZE.h3),
        color: appTheme.primary,
        textTransform: 'capitalize',
      },
      border: {
        borderWidth: 0.2,
        borderColor: appTheme.tertiaryTextColor,
        marginTop: hp(20),
      },
      nextBtnContainer: {
        marginTop: hp(20),
      },
      addImage: {
        height: hp(70),
        width: hp(70),
        borderWidth: 0.5,
        borderColor: appTheme.tertiaryTextColor,
        borderRadius: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: hp(5),
      },
      listImg: {
        height: hp(70),
        width: hp(70),
        borderRadius: hp(8),
        overflow: 'hidden',
        marginRight: hp(5),
      },
      listContainer: {
        width: '100%',
      },
      loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
      label: {
                          ...TEXT_STYLE.regular,
                          fontSize: hp(FONT_SIZE.h3),
                          color:appTheme.primaryTextColor,
                          textTransform: 'capitalize',
                        },
    });
  }, [hp, wp, appTheme]);

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>Category</Text>
       
      </View>
      <View style={styles.booksContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require('../../../../assets/images/books.jpg')}
          />
        </View>
        <View>
          <Text style={styles.booksHeading}>Books, Sports & Hobbies</Text>
          <Text style={styles.books}>Books</Text>
        </View>
      </View>
      {imagesList.length > 0 ? (
        <View style={styles.imagesContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.addImage}
              onPress={() => handleImageSelectorModal(true)}>
              <AnyIcon
                type={IconType.Ionicons}
                name="add"
                size={hp(20)}
                color="blue"
              />
            </TouchableOpacity>
            <View style={styles.listContainer}>
              <FlatList
                horizontal
                data={imagesList}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={styles.listImg}
                      onPress={() => handleOpenAndDelete(index)}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={{uri: item}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
          <View>
            <Text>
              Top on images to edit them, or press, hold and move for
              reordering.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.uploadContainer}>
          <Image
            style={styles.dummyImg}
            source={require('../../../../assets/images/file.png')}
          />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => handleImageSelectorModal(true)}>
            <Text style={styles.btnText}>Add Images</Text>
          </TouchableOpacity>
          <Instructions textAlign="center">
            5MB maximum file size accepted in the following formats: .jpg .jpeg
            .png .gif
          </Instructions>
        </View>
      )}
    </View>
  );
};

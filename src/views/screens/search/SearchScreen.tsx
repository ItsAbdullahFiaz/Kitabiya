import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View,FlatList } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { AnyIcon, BackButton, IconType, MainContainer } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { FONT_SIZE, TEXT_STYLE } from '../../../enums'
import { MaybeYouLike } from './components'
import { AppDataContext } from '../../../context'
import { apiService } from '../../../services/api'
import { useNavigation } from '@react-navigation/native'


const data = ['history', 'science fiction', 'families', 'humor', 'thriller', 'self-help', 'personal', 'the wood', 'adventure'];
export const SearchScreen = () => {
    const navigation=useNavigation<any>();
    const [recent,setRecent]=useState<any>([]);
    const [searchValue,setSearchValue]=useState("");
    const [loading, setLoading] = useState(false);
    const [searchedProduct,setSearchedProduct]=useState<any>([]);
    const {appTheme ,appLang}=useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const fetchProducts = async (search:any) => {
        try {
            setLoading(true);
            const response = await apiService.searchProducts(search);
            console.log("SEARCH_RESPONSE===>",JSON.stringify(response.data));
            if (response.error) {
                throw new Error(response.message || 'Failed to fetch products');
            }

            // Assuming the API returns products sorted by createdAt
            setSearchedProduct(response.data || []);
            setRecent(prev=>[...prev,search]);
        } catch (error) {
            console.error('Error fetching products:', error);
            // You might want to show an error toast here
        } finally {
            setLoading(false);
        }
    };
    const getImageSource = (images: string[]) => {
        // Check if images array exists and has valid URL
        if (images && images.length > 0 && images[0]) {
          return { uri: images[0] };
        }
        // Return default image if no valid image URL
        return require('../../../assets/images/books.jpg'); // Add your default image
      };
    const styles = useMemo(() => {
        return StyleSheet.create({
            header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            },
            searchContainer: {
                height: hp(40),
                width: hp(329),
                borderRadius: hp(12),
                backgroundColor: appTheme.secondaryBackground,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: hp(10)
            },
            input: {
                height: "100%",
                marginTop: hp(5),
                paddingTop: hp(5),
                color:appTheme.secondaryTextColor
            },
            recent: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: hp(20)
            },
            text: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.darkBlack,
                textTransform: "capitalize",
                marginBottom:hp(10)
            },
            textContainer: {
                height: hp(26),
                borderRadius: hp(12),
                paddingHorizontal: hp(10),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "rgba(90, 108, 248, 0.1)",
                marginHorizontal: hp(6),
                marginVertical: hp(10)

            },
            btnText: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.tertiaryTextColor,
            },
            searchedText: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.primary,
                marginRight: hp(8),
                textTransform: "capitalize"
            },
            listContainer: {
                flexDirection: "row",
                flexWrap: 'wrap',
                marginTop: hp(10)
            },
            productCard: {
                width: 150,
                marginRight: 12,
                borderRadius: 8,
                backgroundColor: 'white',
                elevation: 2,
                overflow: 'hidden'
              },
              productImage: {
                width: '100%',
                height: 150,
                backgroundColor: '#f0f0f0' // Placeholder color while loading
              },
              productInfo: {
                padding: 8
              },
              productTitle: {
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 4
              },
              productPrice: {
                fontSize: 12,
                color: '#666',
                marginBottom: 2
              },
              productCondition: {
                fontSize: 12,
                color: '#888'
              },
              emptyContainer: {
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center'
              },
              emptyText: {
                fontSize: 14,
                color: '#666'
              }
        })
    }, [hp, wp])

    return (
        <MainContainer>
            <View style={styles.header}>
                <BackButton />
                <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={()=>fetchProducts(searchValue)}>
                    <AnyIcon
                        type={IconType.EvilIcons}
                        name="search"
                        color={appTheme.inputBorder}
                        size={16}
                    />
                    </TouchableOpacity>
                    <TextInput style={styles.input} value={searchValue} placeholder={appLang.Searchhere} placeholderTextColor={appTheme.inputBorder} onChangeText={val=>setSearchValue(val)}/>
                </View>
            </View>
            {recent.length>0 && (
                <>
            <View style={styles.recent}>
                <Text style={styles.text}>{appLang.recently}</Text>
                <TouchableOpacity>
                    <Text style={styles.btnText}>{appLang.Deleteall}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                {recent.map((item, index) => {
                    return (
                        <View key={index} style={styles.textContainer}>
                            <Text style={styles.searchedText}>{item}</Text>
                            <TouchableOpacity>
                                <AnyIcon
                                    type={IconType.EvilIcons}
                                    name='close'
                                    size={16}
                                    color={appTheme.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
                </>
            )}
            {/* Searched Iten */}
            {searchedProduct.length>0 && (
            <View>
            <Text style={styles.text}>results</Text>
                <FlatList
                data={searchedProduct}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
              >
                <Image
                  source={getImageSource(item.images)}
                  style={styles.productImage}
                  resizeMode="cover"
                  defaultSource={require('../../../assets/images/books.jpg')} // Fallback while loading
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} numberOfLines={1}>
                    {item.title || 'Untitled'}
                  </Text>
                  <Text style={styles.productPrice}>
                    Rs. {item.price || '0'}
                  </Text>
                  <Text style={styles.productCondition}>
                    {item.condition || 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
                    )
                }}
                />
                </View>
            )}
            <MaybeYouLike />
        </MainContainer>
    )
}
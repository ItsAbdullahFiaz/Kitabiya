import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { AnyIcon, BackButton, IconType, MainContainer } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { FONT_SIZE, SCREENS, TEXT_STYLE } from '../../../enums'
import { AppDataContext } from '../../../context'
import { apiService } from '../../../services/api'
import { useNavigation } from '@react-navigation/native'

interface RecentSearch {
    _id: string;
    product: {
        _id: string;
        title: string;
        images: string[];
        price: number;
    };
    createdAt: string;
}

export const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const inputRef = useRef<TextInput>(null);
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchedProduct, setSearchedProduct] = useState<any>([]);
    const { appTheme, appLang } = useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const [hasSearched, setHasSearched] = useState(false);
    const fetchProducts = async (search: any) => {
        try {
            setLoading(true);
            const response = await apiService.searchProducts(search);
            console.log("SEARCH_RESPONSE===>", JSON.stringify(response.data));
            if (response.error) {
                throw new Error(response.message || 'Failed to fetch products');
            }

            // Assuming the API returns products sorted by createdAt
            setSearchedProduct(response.data || []);
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
        return require('./../../../assets/images/books.jpg'); // Add your default image
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
                width: hp(339),
                borderRadius: hp(12),
                backgroundColor: appTheme.secondaryBackground,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: hp(10)
            },
            input: {
                flex: 1,
                height: "100%",
                marginTop: hp(5),
                paddingTop: hp(5),
                color: appTheme.secondaryTextColor
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
                color: appTheme.primaryTextColor,
                textTransform: "capitalize",
                marginBottom: hp(10)
            },
            btnText: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.tertiaryTextColor,
            },
            clearButton: {
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
            },
            card: {
                height: hp(90),
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(12),
                borderWidth: 1,
                borderColor: appTheme.borderDefault,
                borderRadius: hp(8),
            },
            leftContainer: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            },
            imgContainer: {
                width: hp(70),
                backgroundColor: appTheme.disabled,
                height: '100%',
                borderRadius: hp(8),
                overflow: 'hidden',
                marginRight: hp(12),
            },
            img: {
                width: '100%',
                height: '100%',
            },
            name: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h4),
                color: appTheme.secondaryTextColor,
                textTransform: 'capitalize',
            },
            author: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.tertiaryTextColor,
            },
            condition: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h5),
                color: appTheme.tertiaryTextColor,
                marginTop: hp(2),
            },
            noResultContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(20),
            },
            noResultText: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h4),
                color: appTheme.tertiaryTextColor,
                textAlign: 'center',
            },
            iconContainer: { paddingBottom: hp(8) },
        })
    }, [hp, wp])

    // Handle search input change
    const handleSearchChange = (val: string) => {
        setSearchValue(val);
        if (!val.trim()) {
            setSearchedProduct([]);
            setHasSearched(false);
            loadRecentSearches();
        }
    };

    // Modified search submit handler
    const handleSearchSubmit = async () => {
        if (searchValue.trim()) {
            setHasSearched(true);
            await fetchProducts(searchValue);
        }
    };

    // Load recent searches when screen mounts
    useEffect(() => {
        if (!searchValue.trim()) {
            loadRecentSearches();
        }
    }, [searchValue]);

    // Load recent searches from API
    const loadRecentSearches = async () => {
        try {
            const response = await apiService.getRecentSearches();
            if (!response.error && response.data) {
                setRecentSearches(response.data);
            }
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    };

    // Clear all recent searches
    const clearRecentSearches = async () => {
        try {
            await apiService.clearRecentSearches();
            setRecentSearches([]);
        } catch (error) {
            console.error('Error clearing recent searches:', error);
        }
    };

    // Add to recent searches
    const addToRecentSearches = async (productId: string) => {
        try {
            const response = await apiService.addRecentSearch({
                productId
            });

            if (!response.error) {
                // Refresh recent searches list
                loadRecentSearches();
            }
        } catch (error) {
            console.error('Error adding to recent searches:', error);
        }
    };

    // Update product press handler
    const handleProductPress = async (product: any) => {
        try {
            navigation.navigate(SCREENS.BOOK_DETAIL, { product: product, fromSearch: true });
            await addToRecentSearches(product._id);
        } catch (error) {
            console.error('Error handling product press:', error);
        }
    };

    // Add clear search handler
    const handleClearSearch = () => {
        setSearchValue('');
        setSearchedProduct([]);
        setHasSearched(false);
        inputRef.current?.clear();
        loadRecentSearches();
    };

    return (
        <MainContainer>
            <View style={styles.header}>
                <BackButton />
                <View style={styles.searchContainer}>
                    <TouchableOpacity
                        onPress={handleSearchSubmit}
                        disabled={loading || !searchValue.trim()}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color={appTheme.tertiaryTextColor} />
                        ) : (
                            <View style={styles.iconContainer}>
                                <AnyIcon
                                    type={IconType.EvilIcons}
                                    name="search"
                                    color={appTheme.tertiaryTextColor}
                                    size={hp(30)}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        value={searchValue}
                        placeholder={appLang.Searchhere}
                        placeholderTextColor={appTheme.tertiaryTextColor}
                        onChangeText={handleSearchChange}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                        editable={!loading}
                        autoFocus={true}
                    />
                    {searchValue.length > 0 && (
                        <TouchableOpacity
                            onPress={handleClearSearch}
                            style={styles.clearButton}
                        >
                            <AnyIcon
                                type={IconType.EvilIcons}
                                name="close"
                                color={appTheme.tertiaryTextColor}
                                size={16}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Show Recent Searches when no search has been performed */}
            {!hasSearched && recentSearches.length > 0 && (
                <View>
                    <View style={styles.recent}>
                        <Text style={styles.text}>{appLang.recently}</Text>
                        <TouchableOpacity onPress={clearRecentSearches}>
                            <Text style={styles.btnText}>{appLang.Deleteall}</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={recentSearches}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate(SCREENS.BOOK_DETAIL, {
                                        product: item.product,
                                        fromSearch: true,
                                    })
                                }
                            >
                                <View style={styles.leftContainer}>
                                    <View style={styles.imgContainer}>
                                        <Image
                                            source={getImageSource(item.product.images)}
                                            style={styles.img}
                                            resizeMode="cover"
                                            defaultSource={require('./../../../assets/images/books.jpg')}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.name}>{item.product.title || 'Untitled'}</Text>
                                        <Text style={styles.author}>Rs. {item.product.price || '0'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item._id}
                    />
                </View>
            )}

            {/* Show Search Results only after search is performed */}
            {hasSearched && (
                <View style={{ flex: 1 }}>
                    {loading ? (
                        <View style={styles.noResultContainer}>
                            <ActivityIndicator size="large" color={appTheme.tertiaryTextColor} />
                        </View>
                    ) : searchedProduct.length > 0 ? (
                        <FlatList
                            data={searchedProduct}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => handleProductPress(item)}
                                >
                                    <View style={styles.leftContainer}>
                                        <View style={styles.imgContainer}>
                                            <Image
                                                source={getImageSource(item.images)}
                                                style={styles.img}
                                                resizeMode="cover"
                                                defaultSource={require('./../../../assets/images/books.jpg')}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.name}>{item.title || 'Untitled'}</Text>
                                            <Text style={styles.author}>Rs. {item.price || '0'}</Text>
                                            <Text style={styles.condition}>{item.condition || 'N/A'}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item._id}
                        />
                    ) : (
                        <View style={styles.noResultContainer}>
                            <Text style={styles.noResultText}>
                                {appLang.noResultsFound || 'No results found'}
                            </Text>
                        </View>
                    )}
                </View>
            )}
            {/* <MaybeYouLike /> */}
        </MainContainer>
    )
}
import React from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SCREENS } from '../../../../enums';
import { useResponsiveDimensions } from '../../../../hooks';
import { ProductCard } from './ProductCard';
import { GreetingsSection } from './GreetingsSection';

interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    images: string[];
    condition: string;
    type: string;
    language: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
}

interface ProductListProps {
    products: Product[];
    userName: string;
    appTheme: any;
    navigation: any;
    onRefresh?: () => void;
    isRefreshing?: boolean;
}

export const ProductList = ({
    products,
    userName,
    appTheme,
    navigation,
    onRefresh,
    isRefreshing
}: ProductListProps) => {
    const { hp } = useResponsiveDimensions();

    const renderItems = ({ item }: { item: Product }) => {
        return (
            <ProductCard
                item={item}
                onPress={() => navigation.navigate(SCREENS.BOOK_DETAIL, { product: item })}
                appTheme={appTheme}
            />
        );
    };

    if (products.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products available</Text>
            </View>
        );
    }

    return (
        <FlatList
            ListHeaderComponent={
                <GreetingsSection userName={userName} appTheme={appTheme} />
            }
            data={products}
            renderItem={renderItems}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing || false}
                    onRefresh={onRefresh}
                    tintColor={appTheme.primary}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#666',
    },
});
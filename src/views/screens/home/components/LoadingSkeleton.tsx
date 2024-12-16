import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonLoader } from '../../../../components';
import { useResponsiveDimensions } from '../../../../hooks';
import { SIZES } from '../../../../enums';
import { AppDataContext } from '../../../../context';

export const LoadingSkeleton = () => {
    const { hp } = useResponsiveDimensions();
    const { appTheme } = useContext(AppDataContext);

    return (
        <View style={styles(hp).container}>
            {Array.from({ length: 5 }).map((_, index) => (
                <View key={index} style={styles(hp).card}>
                    <SkeletonLoader
                        width={hp(70)}
                        height={hp(90)}
                        borderRadius={hp(8)}
                    />
                    <View style={styles(hp).textContainer}>
                        <SkeletonLoader width="60%" height={hp(14)} borderRadius={4} />
                        <SkeletonLoader
                            width="40%"
                            height={hp(12)}
                            borderRadius={4}
                            style={{ marginTop: hp(4) }}
                        />
                        <SkeletonLoader
                            width="30%"
                            height={hp(10)}
                            borderRadius={4}
                            style={{ marginTop: hp(6) }}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = (hp: any) => StyleSheet.create({
    container: {
        paddingBottom: hp(50),
    },
    card: {
        marginBottom: hp(24),
        flex: 1,
        alignItems: 'center',
        marginHorizontal: hp(17),
        backgroundColor: 'red',
        borderRadius: hp(8),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        // flex: 1,
        width: (SIZES.width / 2) - hp(50),
        paddingHorizontal: hp(10),
        paddingVertical: hp(8),
    },
});
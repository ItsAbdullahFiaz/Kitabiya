// screens/PrivacyPolicyScreen.js
import React, { useContext, useMemo } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useResponsiveDimensions } from '../../../hooks';
import { AppDataContext } from '../../../context';
import { OTHER_TEXT_STYLE } from '../../../enums';
import { Header, MainContainer } from '../../../components';

export const PrivacyPolicy = () => {
    const { wp, hp } = useResponsiveDimensions();
    const { appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            heading: {
                ...OTHER_TEXT_STYLE.large_title,
                color: appTheme.textColor,
                fontSize: hp(24),
                marginBottom: hp(20),
            },
            subheading: {
                ...OTHER_TEXT_STYLE.large_title,
                color: appTheme.textColor,
                fontSize: hp(18),
                marginTop: hp(20),
            },
            text: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.textColor,
                fontSize: hp(16),
                lineHeight: hp(24),
            },
        });
    }, [hp, wp]);

    return (
        <MainContainer>
            <Header />
            <ScrollView>
                <Text style={styles.heading}>Privacy Policy</Text>
                <Text style={styles.text}>
                    We value your privacy and are committed to protecting it. This Privacy Policy explains our practices and your rights regarding your data.
                </Text>
                <Text style={styles.subheading}>1. Information We Collect</Text>
                <Text style={styles.text}>
                    We do not collect any personal data from our users. We may collect URLs you submit for analysis.
                </Text>
                <Text style={styles.subheading}>2. How We Use Your Data</Text>
                <Text style={styles.text}>
                    We use the URLs you submit to provide predictions and improve our machine learning model. No personal data is collected or used.
                </Text>
                <Text style={styles.subheading}>3. Data Sharing</Text>
                <Text style={styles.text}>
                    We do not share any personal data with third parties. The URLs you submit are used solely for the purposes mentioned above.
                </Text>
                <Text style={styles.subheading}>4. Your Rights</Text>
                <Text style={styles.text}>
                    As we do not collect personal data, there is no personal data for you to access, correct, or delete.
                </Text>
                <Text style={styles.subheading}>5. Data Security</Text>
                <Text style={styles.text}>
                    We implement appropriate security measures to protect the URLs you submit from unauthorized access.
                </Text>
            </ScrollView>
        </MainContainer>
    );
};

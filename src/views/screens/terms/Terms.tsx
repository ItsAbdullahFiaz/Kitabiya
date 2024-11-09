// screens/TermsScreen.js
import React, { useContext, useMemo } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useResponsiveDimensions } from '../../../hooks';
import { AppDataContext } from '../../../context';
import { Header, MainContainer } from '../../../components';
import { OTHER_TEXT_STYLE } from '../../../enums';

export const Terms = () => {
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
    }, [hp, wp, appTheme]);

    return (
        <MainContainer>
            <Header />
            <ScrollView>
                <Text style={styles.heading}>Terms and Conditions</Text>
                <Text style={styles.text}>
                    By using this app, you agree to the following terms and conditions:
                </Text>
                <Text style={styles.subheading}>1. Usage Guidelines</Text>
                <Text style={styles.text}>
                    Users are expected to use the app for its intended purpose and in a lawful manner.
                </Text>
                <Text style={styles.subheading}>2. Limitations of Liability</Text>
                <Text style={styles.text}>
                    We are not liable for any damages resulting from the use of this app. The predictions provided are based on machine learning models and may not always be accurate.
                </Text>
                {/* <Text style={styles.subheading}>3. Dispute Resolution</Text>
                <Text style={styles.text}>
                    Any disputes will be resolved through [arbitration/court] in [jurisdiction].
                </Text> */}
                <Text style={styles.subheading}>3. Modification of Terms</Text>
                <Text style={styles.text}>
                    We reserve the right to modify these terms at any time. Changes will be communicated through the app or email.
                </Text>
                <Text style={styles.subheading}>4. Termination</Text>
                <Text style={styles.text}>
                    We may terminate or suspend access to the app for users who violate these terms.
                </Text>
            </ScrollView>
        </MainContainer>
    );
};

import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { AnyIcon, Header, IconType, MainButton, MainContainer } from '../../../components'
import { useNavigation } from '@react-navigation/native'
import { STACK } from '../../../enums'
import { resetAndGo } from '../../../utils'
import { useResponsiveDimensions } from '../../../hooks'
import { AppDataContext, useAuth } from '../../../context'
import city from "../../../utils/city.json"
import { TouchableOpacity } from 'react-native'
import { apiService } from '../../../services/api'
import { useToast } from '../../../hooks/useToast'

export const FourthQuestion = ({ route }: any) => {
    const { selectedTime, selectedInterest, selectedAge } = route.params;
    const navigation = useNavigation<any>();
    const { hp, wp } = useResponsiveDimensions();
    const { appTheme, appLang } = useContext(AppDataContext);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const showToast = useToast();
    const { updateQuestionnaire } = useAuth();

    const handleNext = async () => {
        try {
            setLoading(true);

            // Prepare questionnaire data
            const questionnaireData = {
                profession: selectedTime,
                booksInterest: selectedInterest,
                ageRange: selectedAge,
                city: selectedCity
            };

            // Submit questionnaire data
            const response = await apiService.submitQuestionnaire(questionnaireData);

            if (response.error) {
                throw new Error(response.message || 'Failed to submit questionnaire');
            }

            updateQuestionnaire(true);
            showToast('Questionnaire submitted successfully', 'successToast');
            resetAndGo(navigation, STACK.MAIN, null);
        } catch (error) {
            console.error('Error submitting questionnaire:', error);
            showToast(
                error instanceof Error ? error.message : 'Failed to submit questionnaire',
                'errorToast'
            );
        } finally {
            setLoading(false);
        }
    }

    const filteredCity = city.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const styles = useMemo(() => {
        return StyleSheet.create({
            btnContainer: {
                position: "absolute",
                bottom: hp(30),
                alignSelf: "center",
                width: "100%"
            },
            searchContainer: {
                marginTop: hp(20),
                height: hp(46),
                width: '100%',
                borderRadius: hp(12),
                backgroundColor: appTheme.secondaryBackground,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: hp(10),
            },
            input: {
                height: '100%',
                marginTop: hp(5),
                paddingTop: hp(5),
                color: appTheme.secondaryTextColor,
            },
            iconContainer: { paddingBottom: hp(8) },
            container: {
                padding: 16,
                marginTop: hp(10),
                marginBottom: hp(160)
            },
            optionContainer: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#E0E0E0",
                backgroundColor: "#FFFFFF",
            },
            selectedOptionContainer: {
                // borderColor: appTheme.primary,
                // backgroundColor: "#F4F1FD",
            },
            optionText: {
                fontSize: 16,
                color: "#000",
            },
            selectedOptionText: {
                color: appTheme.primary,
                fontWeight: "bold",
            },
            checkmark: {
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: appTheme.primary,
            },
        })
    }, [])
    return (
        <MainContainer>
            <Header title='Select your city' />
            <View style={styles.searchContainer}>
                <View style={styles.iconContainer}>
                    <AnyIcon
                        type={IconType.EvilIcons}
                        name="search"
                        color={appTheme.tertiaryTextColor}
                        size={hp(30)}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={appLang.Searchhere}
                    placeholderTextColor={appTheme.tertiaryTextColor}
                    onChangeText={text => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={filteredCity}
                    renderItem={({ item, index }) => {
                        console.log("OPTIONS===>", item)
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionContainer,
                                    selectedCity === item.name && styles.selectedOptionContainer,
                                ]}
                                onPress={() => setSelectedCity(item.name)}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        selectedCity === item.name && styles.selectedOptionText,
                                    ]}
                                >
                                    {item.name}
                                </Text>
                                {selectedCity === item.name && <View style={styles.checkmark} />}
                            </TouchableOpacity>
                        )

                    }}
                />
            </View>
            <View style={styles.btnContainer}>
                <MainButton
                    onPress={handleNext}
                    buttonText={"Next"}
                    isLoading={loading}
                    disableBtn={selectedCity === "" ? true : false}
                />
            </View>
        </MainContainer>
    )
}

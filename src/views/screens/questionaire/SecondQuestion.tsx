import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { Header, MainButton, MainContainer } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { AppDataContext } from '../../../context'
import { FONT_SIZE, SCREENS, TEXT_STYLE } from '../../../enums'
import { useNavigation } from '@react-navigation/native'
import { resetAndGo } from '../../../utils'

export const SecondQuestion = ({ route }: any) => {
    const { selectedTime } = route.params;
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const { hp, wp } = useResponsiveDimensions();
    const { appTheme } = useContext(AppDataContext);
    const [selectedInterest, setSelectedInterest] = useState("");
    const options = ["Literature", "Novels", "History", "Science"];
    const handleNext = () => {
        setLoading(true);
        navigation.navigate(SCREENS.THIRDQUESTION, {
            selectedTime: selectedTime,
            selectedInterest: selectedInterest
        });
        setLoading(false);
    }
    const styles = useMemo(() => {
        return StyleSheet.create({
            qNum: {
                ...TEXT_STYLE.medium,
                fontSize: hp(FONT_SIZE.h3),
                color: appTheme.primary,
                marginTop: hp(20)
            },
            question: {
                ...TEXT_STYLE.bold,
                fontSize: hp(FONT_SIZE.h1),
                color: appTheme.primaryTextColor,
                marginTop: hp(10)
            },
            container: {
                padding: 16,
                elevation: 0.2,
                marginTop: hp(20)
            },
            optionContainer: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                marginVertical: 8,
                borderWidth: 1,
                borderColor: "#E0E0E0",
                borderRadius: 8,
                backgroundColor: "#FFFFFF",
            },
            selectedOptionContainer: {
                borderColor: appTheme.primary,
                backgroundColor: "#F4F1FD",
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
            btnContainer: {
                position: "absolute",
                bottom: hp(30),
                alignSelf: "center",
                width: "100%"
            }
        })
    }, [hp, wp])
    return (
        <MainContainer>
            <Header title='Questionaire' />
            <Text style={styles.qNum}>Question 2 of 4</Text>
            <Text style={styles.question}>In which books you are interested?</Text>
            <View style={styles.container}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionContainer,
                            selectedInterest === option && styles.selectedOptionContainer,
                        ]}
                        onPress={() => setSelectedInterest(option)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedInterest === option && styles.selectedOptionText,
                            ]}
                        >
                            {option}
                        </Text>
                        {selectedInterest === option && <View style={styles.checkmark} />}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.btnContainer}>
                <MainButton
                    onPress={handleNext}
                    buttonText={"Next"}
                    isLoading={loading}
                    disableBtn={selectedInterest === "" ? true : false}
                />
            </View>
        </MainContainer>
    )
}

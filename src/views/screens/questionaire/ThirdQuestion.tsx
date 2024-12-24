import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { Header, MainButton, MainContainer } from '../../../components'
import { useResponsiveDimensions } from '../../../hooks'
import { AppDataContext } from '../../../context'
import { FONT_SIZE, STACK, TEXT_STYLE } from '../../../enums'
import { useNavigation } from '@react-navigation/native'
import { resetAndGo } from '../../../utils'

export const ThirdQuestion = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { hp, wp } = useResponsiveDimensions();
    const { appTheme } = useContext(AppDataContext);
    const [selectedTime, setSelectedTime] = useState("");
    const options = ["15-25", "25-35", "35-45", "45-60"];
    const handleNext = () => {
        setLoading(true);
        resetAndGo(navigation, STACK.MAIN, null);
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
            <Text style={styles.qNum}>Question 3 of 3</Text>
            <Text style={styles.question}>What is your age range?</Text>
            <View style={styles.container}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionContainer,
                            selectedTime === option && styles.selectedOptionContainer,
                        ]}
                        onPress={() => setSelectedTime(option)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedTime === option && styles.selectedOptionText,
                            ]}
                        >
                            {option}
                        </Text>
                        {selectedTime === option && <View style={styles.checkmark} />}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.btnContainer}>
                <MainButton
                    onPress={handleNext}
                    buttonText={"Next"}
                    isLoading={loading}
                    disableBtn={selectedTime === "" ? true : false}
                />
            </View>
        </MainContainer>
    )
}

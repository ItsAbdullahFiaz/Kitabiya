import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { AppDataContext } from '../../../../context';
import { useResponsiveDimensions } from '../../../../hooks';
import { FONT_SIZE, TEXT_STYLE } from '../../../../enums';
import { AnyIcon, IconType } from '../../../../components';
import city from "../../../../utils/city.json"

interface headerProps {
    handleSelectOption: any;
    cityState?: any;
}

export const City = (props: headerProps) => {
    const { handleSelectOption, cityState } = props;
    const { appTheme, appLang } = useContext(AppDataContext);
    const { hp, wp } = useResponsiveDimensions();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelect = (city: any) => {
        handleSelectOption(city);
        setIsModalVisible(false);
    };

    const filteredCity = city.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const styles = useMemo(() => {
        return StyleSheet.create({
            label: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h3),
                color: appTheme.primaryTextColor,
                textTransform: 'capitalize',
                marginBottom: hp(3)
            },
            typeContainer: {
                marginTop: hp(15),
            },
            dropdownButton: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: appTheme.borderDefault,
                paddingHorizontal: 15,
                height: hp(48),
                borderRadius: 5,
                width: '100%',
            },
            buttonText: {
                color: appTheme.primaryTextColor,
                fontSize: hp(FONT_SIZE.h4),
                textTransform: 'capitalize',
            },
            modalContainer: {
                flex: 1,
                backgroundColor: appTheme.primaryBackground,
            },
            header: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: hp(16),
            },
            modalTitle: {
                ...TEXT_STYLE.medium,
                fontSize: FONT_SIZE.h3,
                color: appTheme.primaryTextColor,
                textTransform: 'capitalize',
                marginLeft: hp(20),
            },
            searchContainer: {
                height: hp(50),
                backgroundColor: appTheme.primaryBackground,
                borderRadius: hp(12),
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingHorizontal: hp(10),
                marginHorizontal: hp(16),
                borderWidth: 0.5,
                borderColor: appTheme.tertiaryTextColor,
            },
            searchHere: {
                ...TEXT_STYLE.regular,
                fontSize: FONT_SIZE.h5,
                color: appTheme.borderDefault,
                marginLeft: hp(10),
            },
            listContainer: {
                marginVertical: hp(20),
                paddingBottom: hp(100),
            },
            optionContainer: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#E0E0E0",
                backgroundColor: "#FFFFFF",
                marginHorizontal: hp(16)
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
            input: {
                height: '100%',
                marginTop: hp(5),
                paddingTop: hp(5),
                color: appTheme.secondaryTextColor,
            },
            iconContainer: { paddingBottom: hp(8) },
        });
    }, [hp, wp]);

    return (
        <View style={styles.typeContainer}>
            <Text style={styles.label}>City</Text>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsModalVisible(true)}>
                <Text style={styles.buttonText}>{cityState}</Text>
                <AnyIcon
                    type={IconType.Ionicons}
                    name="chevron-forward"
                    size={20}
                    color="#000"
                />
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <AnyIcon
                                type={IconType.Ionicons}
                                name="close-outline"
                                color={appTheme.tertiaryTextColor}
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Select city</Text>
                    </View>
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
                    <View style={styles.listContainer}>
                        <FlatList
                            data={filteredCity}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.optionContainer}
                                        onPress={() => handleSelect(item.name)}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                selectedTime === item.name && styles.selectedOptionText,
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                        {selectedTime === item.name && <View style={styles.checkmark} />}
                                    </TouchableOpacity>
                                )

                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

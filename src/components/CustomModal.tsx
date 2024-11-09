// CustomModal.tsx
import React, { ReactNode, useContext, useMemo } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';
import { MainButton } from './MainButton';
import { OTHER_TEXT_STYLE } from '../enums';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, title, children }) => {
    const { wp, hp } = useResponsiveDimensions();
    const { appTheme, appLang } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            centeredView: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            modalView: {
                margin: hp(20),
                backgroundColor: appTheme.secondary,
                borderRadius: hp(18),
                paddingVertical: hp(35),
                shadowColor: appTheme.secondary,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: hp(4),
                elevation: 5,
                width: '80%',
            },
            modalTitle: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.textColor,
                fontSize: hp(20),
                marginBottom: hp(15),
                textAlign: 'center'
            },
            modalContent: {
                marginBottom: hp(20),
                borderRadius: hp(18),
            },
            buttonView: {
                paddingHorizontal: hp(34)
            }
        });
    }, [hp, wp, appTheme]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <View style={styles.modalContent}>{children}</View>
                    <View style={styles.buttonView}>
                        <MainButton
                            onPress={onClose}
                            buttonText={appLang.close}
                            dismissiveButton={true}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

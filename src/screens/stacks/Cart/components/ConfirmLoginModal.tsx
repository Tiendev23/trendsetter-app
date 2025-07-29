import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onLogin: () => void;
}
export default function ConfirmLoginModal({ visible, onClose, onLogin }: Props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        Yêu cầu đăng nhập
                    </Text>
                    <Text style={styles.message}>
                        Bạn cần đăng nhập để mua hàng.{'\n'}
                        Bạn có muốn đăng nhập không?
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text>Tiếp tục xem hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onLogin}>
                            <Text style={{ fontWeight: 'bold' }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '80%',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
    },
});
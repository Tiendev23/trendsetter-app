import { ObjectId } from '@/types';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    visible: boolean;
    onNegative: () => void;
    onPositive: () => void;
}
export default function ConfirmCancelModal({ visible, onNegative, onPositive }: Props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onNegative}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View>
                        <Text style={styles.title}>
                            Bạn chắc chắn huỷ đơn hàng?
                        </Text>
                        <Text style={styles.subtitle}>
                            Lưu ý:{'\n'}Huỷ đơn hàng liên tiếp có thể khiến tài khoản bị khoá!
                        </Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onNegative}>
                            <Text>Không</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onPositive}>
                            <Text style={styles.positiveLabel}>Huỷ đơn</Text>
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
        gap: 10
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    subtitle: {
        fontWeight: '500',
        color: '#C21E0C',
        lineHeight: 20
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
        color: "#C21E0C"
    },
    positiveLabel: {
        fontWeight: 'bold',
        color: "#C21E0C"
    }
});
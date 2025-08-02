import { ObjectId } from '@/types';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    visible: boolean;
    checkedIds: ObjectId[];
    onNegative: () => void;
    onPositive: () => void;
}
export default function ConfirmDeleteModal({ visible, checkedIds, onNegative, onPositive }: Props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onNegative}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        Bạn có muốn bỏ {checkedIds.length} sản phẩm?
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onNegative}>
                            <Text>Không</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onPositive}>
                            <Text style={{ fontWeight: 'bold' }}>Đồng ý</Text>
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
        color: "#C21E0C"
    },
});
import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onForgotPassword: () => void;
}

const PasswordConfirmModal: React.FC<Props> = ({
    visible,
    onClose,
    onSuccess,
    onForgotPassword,
}) => {
    const [password, setPassword] = useState<string>('');

    const handleConfirm = () => {
        if (password === '123456') {
            onClose();
            onSuccess();
        } else {
            Alert.alert('Sai mật khẩu', 'Vui lòng thử lại');
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Nhập mật khẩu hiện tại</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />
                    <View style={styles.modalActions}>
                        <TouchableOpacity onPress={handleConfirm}>
                            <Text style={styles.confirmButton}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.confirmButton}>Hủy</Text>
                        </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onClose();
                            onForgotPassword();
                        }}
                    >
                        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal >
    );
};

export default PasswordConfirmModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 16,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#006340',
        color: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        fontWeight: '600',
    },
    forgotText: {
        color: '#006340',
        fontSize: 13,
    },
});

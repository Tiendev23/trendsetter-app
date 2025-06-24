import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChangePassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSendCode = () => {
        Alert.alert('Mã xác thực đã được gửi đến email của bạn.');
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
            return;
        }

        console.log('Đổi mật khẩu với:', { email, newPassword });
        Alert.alert('Thành công', 'Mật khẩu của bạn đã được thay đổi.');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Đổi mật khẩu</Text>

            <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                    <Feather name="mail" size={18} color="#006340" />
                    <Text style={styles.label}>Email</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Nhập email"
                    keyboardType="email-address"
                />
                <TouchableOpacity style={styles.codeButton} onPress={handleSendCode}>
                    <Text style={styles.codeButtonText}>Gửi mã xác thực</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                    <MaterialCommunityIcons name="lock-reset" size={20} color="#006340" />
                    <Text style={styles.label}>Mật khẩu mới</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Nhập mật khẩu mới"
                    secureTextEntry
                />
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                    <MaterialCommunityIcons name="lock-check-outline" size={20} color="#006340" />
                    <Text style={styles.label}>Xác nhận mật khẩu</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Nhập lại mật khẩu mới"
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
                <Text style={styles.saveText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F7F7F7',
        flexGrow: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#006340',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    label: {
        marginLeft: 8,
        color: '#333',
        fontSize: 15,
        fontWeight: '600',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 15,
    },
    codeButton: {
        marginTop: 8,
        alignSelf: 'flex-end',
    },
    codeButtonText: {
        color: '#006340',
        fontWeight: '600',
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#006340',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    saveText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import { Feather, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function AddressEdit() {
    const [form, setForm] = useState({
        fullName: 'Nguyễn Văn A',
        phoneNumber: '0987654321',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        detailAddress: '123 đường ABC',
        isDefault: true,
    });

    const handleChange = (key: keyof typeof form, value: string | boolean) => {
        setForm({ ...form, [key]: value });
    };

    const InputField = ({ label, icon, value, onChangeText, multiline = false, keyboardType = 'default' }) => (
        <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputContainer}>
                {icon}
                <TextInput
                    style={[styles.input, multiline && { height: 80, textAlignVertical: 'top' }]}
                    value={value}
                    onChangeText={onChangeText}
                    multiline={multiline}
                //keyboardType={keyboardType}
                />
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Cập nhật địa chỉ</Text>

            <InputField
                label="Họ và tên"
                icon={<Feather name="user" size={20} color="#006340" style={styles.icon} />}
                value={form.fullName}
                onChangeText={(v) => handleChange('fullName', v)}
            />

            <InputField
                label="Số điện thoại"
                icon={<Feather name="phone" size={20} color="#006340" style={styles.icon} />}
                value={form.phoneNumber}
                keyboardType="phone-pad"
                onChangeText={(v) => handleChange('phoneNumber', v)}
            />

            <View style={styles.rowGroup}>
                <InputField
                    label="Tỉnh/TP"
                    icon={<Entypo name="location" size={18} color="#006340" style={styles.icon} />}
                    value={form.province}
                    onChangeText={(v) => handleChange('province', v)}
                />
                <InputField
                    label="Quận/Huyện"
                    icon={<Ionicons name="business" size={18} color="#006340" style={styles.icon} />}
                    value={form.district}
                    onChangeText={(v) => handleChange('district', v)}
                />
                <InputField
                    label="Phường/Xã"
                    icon={<MaterialIcons name="location-city" size={18} color="#006340" style={styles.icon} />}
                    value={form.ward}
                    onChangeText={(v) => handleChange('ward', v)}
                />
            </View>

            <InputField
                label="Chi tiết địa chỉ"
                icon={<Feather name="map-pin" size={20} color="#006340" style={styles.icon} />}
                value={form.detailAddress}
                onChangeText={(v) => handleChange('detailAddress', v)}
                multiline
            />

            <View style={styles.switchRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="star" size={20} color="#006340" />
                    <Text style={styles.switchLabel}>Đặt làm địa chỉ mặc định</Text>
                </View>
                <Switch value={form.isDefault} onValueChange={(v) => handleChange('isDefault', v)} />
            </View>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>Lưu địa chỉ</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F2F3F5',
        flexGrow: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#006340',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
        marginLeft: 4,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e1e1e1',
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#222',
    },
    icon: {
        marginRight: 10,
    },
    rowGroup: {
        gap: 10,
        marginBottom: 16,
    },
    switchRow: {
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchLabel: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '500',
        color: '#2B2B2B',
    },
    saveButton: {
        backgroundColor: '#006340',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

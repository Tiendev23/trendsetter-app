import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../contexts/AuthContext';

export default function ProfileEdit({ navigation }) {
    const { user, setUser } = useContext(AuthContext)

    const [name, setName] = useState(user?.fullName || '');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [dob, setDob] = useState(new Date(1995, 4, 15));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [phone, setPhone] = useState('0123456789');
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };
    const handleSave = () => {
        if (!user) return;

        const updatedUser = {
            ...user,
            fullName: name,
            email,
            gender,
            dob: dob.toISOString(),
            phone,
            avatar,
            updatedAt: new Date().toISOString(),
        };

        Alert.alert(
            'Thành công',
            'Thông tin đã được lưu.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(), // quay lại màn hình trước
                },
            ],
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handleImagePick}>
                <Image
                    source={avatar ? { uri: avatar } : require('../../../assets/images/nenchu.jpg')}
                    style={styles.avatar}
                />
                <Text style={styles.avatarText}>Thay ảnh đại diện</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Họ và tên</Text>
            <TextInput value={name}
                onChangeText={setName} style={styles.input} />

            <Text style={styles.label}>Email</Text>
            <TextInput value={user.email} onChangeText={setEmail} style={[styles.input, { backgroundColor: '#EEE' }]} keyboardType="email-address" editable={false}
            />

            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.genderContainer}>
                <TouchableOpacity onPress={() => setGender('male')} style={[styles.genderButton, gender === 'male' && styles.genderSelected]}>
                    <Text>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGender('female')} style={[styles.genderButton, gender === 'female' && styles.genderSelected]}>
                    <Text>Nữ</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Ngày sinh</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text>{dob.toLocaleDateString('vi-VN')}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={dob}
                    mode="date"
                    display="spinner"
                    onChange={(_, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDob(selectedDate);
                    }}
                />
            )}

            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

            <TouchableOpacity style={styles.saveButton}
                onPress={handleSave}>
                <Text style={styles.saveText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 8,
    },
    avatarText: {
        textAlign: 'center',
        color: '#006340',
        marginBottom: 20,
    },
    label: {
        marginBottom: 6,
        color: '#333',
        fontWeight: '600',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },
    genderButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        alignItems: 'center',
    },
    genderSelected: {
        backgroundColor: '#A4E3D1',
    },
    dateButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: '#006340',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    saveText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});

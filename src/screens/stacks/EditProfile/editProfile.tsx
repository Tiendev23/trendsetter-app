import React, { useContext, useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { updateProfile } from '../../../redux/features/User/userSlice';

export default function ProfileEdit({ navigation }:{navigation:any}) {
    const { user, setUser } = useContext(AuthContext);

    const [name, setName] = useState(user?.fullName || '');
    const [gender, setGender] = useState<'male' | 'female'>(
        user?.gender?.toLowerCase() === 'female' ? 'female' : 'male'
    );
    const [dob, setDob] = useState(user?.birthday ? new Date(user.birthday) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
    console.log('Gender from user:', user?.gender);

    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.user.status);

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

    const handleSave = async () => {
        if (!user) return;

        const formData = new FormData();
        formData.append('fullName', name);
        formData.append('gender', gender);
        formData.append('birthday', dob.toISOString().split('T')[0]);

        // Chỉ thêm avatar nếu là ảnh mới chọn
        if (avatar && avatar.startsWith('file')) {
            const fileName = avatar.split('/').pop();
            const match = /\.(\w+)$/.exec(fileName ?? '');
            const ext = match?.[1] ?? 'jpg';
            const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

            formData.append('avatar', {
                uri: avatar,
                name: fileName,
                type: mime,
            } as any);
        }
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}:`, pair[1]);
        // }
        try {
            const resultAction = await dispatch(updateProfile({ userId: user._id, formData }));

            if (updateProfile.fulfilled.match(resultAction)) {
                const updatedUser = resultAction.payload.user;
                setUser({ ...user, ...updatedUser });

                Alert.alert('Thành công', 'Thông tin đã được cập nhật.', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                const errorMsg = (resultAction.payload as string) || 'Đã xảy ra lỗi';
                Alert.alert('Lỗi', errorMsg);
            }
        } catch (error) {
            Alert.alert('Lỗi', String(error));
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarSection}>
                <Image
                    source={{ uri: avatar || 'https://i.pravatar.cc/150' }}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick}>
                    <Ionicons name="camera-reverse-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Họ và tên</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={user.email}
                editable={false}
                style={[styles.input, { backgroundColor: '#EEE' }]}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.genderContainer}>
                <TouchableOpacity
                    onPress={() => setGender('male')}
                    style={[styles.genderButton, gender === 'male' && styles.genderSelected]}
                >
                    <Text>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setGender('female')}
                    style={[styles.genderButton, gender === 'female' && styles.genderSelected]}
                >
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


            <TouchableOpacity
                style={[styles.saveButton, loading === 'loading' && { opacity: 0.6 }]}
                onPress={handleSave}
                disabled={loading === 'loading'}
            >
                <Text style={styles.saveText}>
                    {loading === 'loading' ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F8F9FA',
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
    avatarSection: {
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#00796B',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: '#00796B',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
});

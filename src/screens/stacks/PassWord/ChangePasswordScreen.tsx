import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Backnav from '../../../components/Tabbar/Backnav';
import CustomInput from '../../../components/CustomInput';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AuthContext } from '../../../contexts/AuthContext';
import { changePass, resetChangePass, resetChangePassword } from '../../../redux/features/auth/ChangePassword';
import { validatePassword } from '@/utils/validateForm';

export default function ChangePasswordScreen({ navigation, route }) {
    const currentPassword = route?.params?.currentPassword ?? null;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false)

    const dispatch = useAppDispatch();
    const { email } = useContext(AuthContext);
    const { status, error } = useAppSelector((state) => state.changePass);
    useEffect(() => {
        dispatch(resetChangePass());
    }, []);
    const handleChangePassword = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ mật khẩu và xác nhận.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
            return;
        }
        if (!validatePassword(newPassword)) {
            Alert.alert('Lỗi', 'Mật khẩu không hợp lệ.');
            return;
        }

        if (currentPassword) {
            // Trường hợp đổi mật khẩu khi đã đăng nhập
            dispatch(changePass({ currentPassword, newPassword }));
        } else {
            // Trường hợp đặt lại mật khẩu khi quên
            dispatch(resetChangePassword(newPassword));
        }
    };

    useEffect(() => {
        if (status === 'succeeded') {
            setShowSuccess(true);
            setTimeout(() => {
                dispatch(resetChangePass());
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login', params: { email } }],
                });
            }, 4000);
        }

        if (status === 'failed') {
            Alert.alert('Lỗi', error || 'Đổi mật khẩu thất bại. Vui lòng thử lại!');
        }
    }, [status, error]);

    if (showSuccess) {
        return (
            <View style={styles.successContainer}>
                <View style={styles.successCircle}>
                    <MaterialCommunityIcons name="check" size={60} color="#088A2D" />
                </View>
                <Text style={styles.Circletitle}>Đổi mật khẩu thành công!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Backnav navigation={navigation} />
            <ScrollView
                contentContainerStyle={styles.contentWrapper}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container_content}>
                    <Text style={styles.txttitle}>Đặt lại mật khẩu</Text>
                    <Text style={styles.txtsub}>
                        Tạo mật khẩu mới. Đảm bảo mật khẩu này khác với mật khẩu trước đó để bảo mật
                    </Text>
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <MaterialCommunityIcons name="lock-reset" size={20} color="#006340" />
                        <Text style={styles.label}>Mật khẩu mới</Text>
                    </View>
                    <CustomInput
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Nhập mật khẩu mới"
                        type="password"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <MaterialCommunityIcons name="lock-check-outline" size={20} color="#006340" />
                        <Text style={styles.label}>Xác nhận mật khẩu</Text>
                    </View>
                    <CustomInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Nhập lại mật khẩu mới"
                        type="password"
                    />
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, status === 'loading' && { opacity: 0.6 }]}
                    onPress={handleChangePassword}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveText}>Đổi mật khẩu</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
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
    container_content: {
        marginTop: 10,
        marginBottom: 33,
    },
    txttitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    txtsub: {
        fontSize: 16,
        color: '#989898',
        lineHeight: 23,
    },
    successContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 200
    },
    successCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EFF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        borderWidth: 1,
        borderColor: '#088A2D'
    },

    Circletitle: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold'

    }
});

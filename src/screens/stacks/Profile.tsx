import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PasswordConfirmModal from '../../components/Password/PasswordConfirmModal'; // chỉnh đường dẫn nếu cần
import { AuthContext } from '../../contexts/AuthContext';
import Backnav from '../../components/Tabbar/Backnav';

export interface Props {
    navigation: any;
    route?: any;
}

const Profile: React.FC<Props> = ({ navigation,route }) => {
    const {title}=route.params||{};
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { user, } = useContext(AuthContext);
    

    return (
        <>
            <Backnav navigation={navigation} route={route} />
            <ScrollView style={styles.container}>
                {/* Hồ sơ cá nhân */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="person-circle-outline" size={22} color="#006340" />
                        <Text style={styles.sectionTitle}>Hồ sơ cá nhân</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.label}>Tên:</Text>
                        <Text style={styles.value}>{user.fullName}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{user.email}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.label}>Giới tính:</Text>
                        <Text style={styles.value}>{user.role}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.label}>Ngày sinh:</Text>
                        <Text style={styles.value}>01/01/1990</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.label}>SĐT:</Text>
                        <Text style={styles.value}>0123456789</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('editProfile')}
                    >
                        <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>

                {/* Địa chỉ */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="location-outline" size={22} color="#006340" />
                        <Text style={styles.sectionTitle}>Địa chỉ</Text>
                    </View>
                    <View style={styles.addressBox}>
                        <Text style={styles.edittext} onPress={() => { navigation.navigate('addr') }}>Sửa</Text>

                        <View style={styles.addressTopRow}>
                            <Ionicons
                                name="location-sharp"
                                size={18}
                                color="#006340"
                                style={{ marginRight: 6 }}
                            />
                            <Text style={styles.addressName}>Nguyễn Văn A</Text>
                            <View style={styles.defaultTag}>
                                <Text style={styles.defaultText}>Mặc định</Text>
                            </View>
                        </View>
                        <Text style={styles.addressText}>0123456789</Text>
                        <Text style={styles.addressText}>
                            123 Đường ABC, Phường 5, Quận 1, TP. HCM
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('addr')}
                    >
                        <Text style={styles.editButtonText}>Thêm địa chỉ mới</Text>
                    </TouchableOpacity>
                </View>

                {/* Bảo mật */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="lock-closed-outline" size={22} color="#006340" />
                        <Text style={styles.sectionTitle}>Bảo mật</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.securityOption}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.securityOption}>
                        <Text>Xác thực 2 yếu tố</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal xác nhận */}
                <PasswordConfirmModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSuccess={() => navigation.navigate('ChangePasswordScreen')}
                    onForgotPassword={() => navigation.navigate('ForgotPassword')}
                />
            </ScrollView>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,

    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    label: {
        fontWeight: '500',
        color: '#555',
    },
    value: {
        color: '#333',
    },
    editButton: {
        marginTop: 12,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: '#006340',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    addressBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        position: 'relative'

    },
    addressTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    addressName: {
        fontWeight: '600',
        fontSize: 14,
        color: '#222',
    },
    addressText: {
        fontSize: 13,
        color: '#333',
        marginBottom: 2,
    },
    defaultTag: {
        marginLeft: 8,
        backgroundColor: '#006340',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    defaultText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '500',
    },
    securityOption: {
        paddingVertical: 10,
    },
    edittext: {
        color: '#319F56',
        fontSize: 14,
        fontWeight: 'bold',
        position: 'absolute',
        right: 10, top: 10,
        fontStyle: 'italic'
    },

});

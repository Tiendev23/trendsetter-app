import React from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Switch,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PasswordConfirmModal from '../../../components/Password/PasswordConfirmModal';
import { AuthContext } from '../../../contexts/AuthContext';
import Backnav from '../../../components/Tabbar/Backnav';


export interface Props {
    navigation: any;
    route?: any;
}


// Card chung cho các mục
const SettingsCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        {children}
    </View>
);
interface NavRowProps {
    text: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    color?: string;
}
const NavRow: React.FC<NavRowProps> = ({ text, icon, onPress, color = '#333' }) => (
    <TouchableOpacity style={styles.navRow} onPress={onPress}>
        <Ionicons name={icon} size={22} color={color} style={styles.navRowIcon} />
        <Text style={[styles.navRowText, { color }]}>{text}</Text>
        <Ionicons name="chevron-forward-outline" size={22} color="#C7C7CC" />
    </TouchableOpacity>
);

// Switch
interface SwitchRowProps {
    text: string;
    icon: keyof typeof Ionicons.glyphMap;
    value: boolean;
    onValueChange: (value: boolean) => void;
}
const SwitchRow: React.FC<SwitchRowProps> = ({ text, icon, value, onValueChange }) => (
    <View style={styles.navRow}>
        <Ionicons name={icon} size={22} color="#333" style={styles.navRowIcon} />
        <Text style={styles.navRowText}>{text}</Text>
        <Switch
            trackColor={{ false: "#E9E9EA", true: "#34C759" }}
            thumbColor={"#FFFFFF"}
            onValueChange={onValueChange}
            value={value}
        />
    </View>
);


const Profile: React.FC<Props> = ({ navigation, route }) => {
    const { title } = route.params || {};
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const { user, logout } = React.useContext(AuthContext);

    // State giả cho các cài đặt thông báo
    const [promoNotif, setPromoNotif] = React.useState(true);
    const [orderNotif, setOrderNotif] = React.useState(true);

    return (
        <View style={styles.screen}>
            <Backnav navigation={navigation} route={route}  />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
 
                <SettingsCard title="Tài khoản">
                    <NavRow text="Thông tin cá nhân" icon="person-outline" onPress={() => navigation.navigate('editProfile')} />
                    <NavRow text="Địa chỉ đã lưu" icon="location-outline" onPress={() => navigation.navigate('addr')} />
                    <NavRow text="Phương thức thanh toán" icon="card-outline" onPress={() => { /* cap nhat sau */ }} />
                </SettingsCard>

                <SettingsCard title="Bảo mật">
                    <NavRow text="Đổi mật khẩu" icon="lock-closed-outline" onPress={() => setModalVisible(true)} />
                    <NavRow text="Lịch sử đăng nhập" icon="list-circle-outline" onPress={() => { /* cap nhat sau */ }} />
                    <NavRow text="Xác thực hai yếu tố (2FA)" icon="shield-checkmark-outline" onPress={() => { /* cap nhat sau */ }} />
                </SettingsCard>

                <SettingsCard title="Thông báo">
                    <SwitchRow text="Khuyến mãi & Tin tức" icon="newspaper-outline" value={promoNotif} onValueChange={setPromoNotif} />
                    <SwitchRow text="Cập nhật đơn hàng" icon="cube-outline" value={orderNotif} onValueChange={setOrderNotif} />
                </SettingsCard>

                <SettingsCard title="Thông tin & Hỗ trợ">
                    <NavRow text="Trung tâm hỗ trợ" icon="help-buoy-outline" onPress={() => { /* Navigate to Help Center */ }} />
                    <NavRow text="Điều khoản dịch vụ" icon="document-text-outline" onPress={() => navigation.navigate('TermsOfServiceScreen')} />
                    <NavRow text="Chính sách bảo mật" icon="document-lock-outline" onPress={() => { /* Navigate to Privacy Policy */ }} />
                </SettingsCard>

                <View style={styles.dangerZone}>
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* Show delete confirmation */ }}>
                        <Text style={styles.deleteAccountText}>Xóa tài khoản</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Modal */}
            <PasswordConfirmModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSuccess={() => {
                    setModalVisible(false);
                    navigation.navigate('ChangePasswordScreen');
                }}
                onForgotPassword={() => {
                    setModalVisible(false);
                    navigation.navigate('ForgotPasswordScreen');
                }}
            />
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F0F0F7',
    },
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 16,
        marginTop: 20,
        paddingLeft: 16, 
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6D6D72',
        textTransform: 'uppercase',
        paddingTop: 16,
        paddingBottom: 8,
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingRight: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#E5E5EA',
    },
    navRowIcon: {
        marginRight: 12,
        width: 24, 
        textAlign: 'center',
    },
    navRowText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    dangerZone: {
        marginTop: 40,
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 16,
    },
    logoutButton: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#FF3B30', 
        fontSize: 16,
        fontWeight: '600',
    },
    deleteAccountText: {
        color: '#8A8A8E',
        fontSize: 14,
    }
});
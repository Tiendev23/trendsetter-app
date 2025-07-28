import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext, useAuthContext, } from '../../contexts/AuthContext';
import { useAppDispatch } from '../../redux/hooks';
import { refresh } from '../../redux/features/auth/loginSlice';
import { TabsNav } from '../../navigation/NavigationTypes';
import CustomButton from '../../components/buttons/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { User } from '../../types/models';
import { useCartContext } from '@/contexts/CartContext';

// Dữ liệu cho các mục menu
const myAccountItems = [
    { id: 'profile', icon: 'user-cog', title: 'Thiết lập tài khoản', screen: 'Profile' },
    { id: 'cart', icon: 'shopping-cart', title: 'Giỏ hàng', screen: 'Cart' },
    { id: 'favorite', icon: 'heart', title: 'Yêu thích', screen: 'Favorites' },
    { id: 'wallet', icon: 'wallet', title: 'Ví', screen: 'Wallet' },
];

const appSettingsItems = [
    { id: 'settings', icon: 'sliders-h', title: 'Cài đặt', screen: 'Settings' },
    { id: 'help', icon: 'question-circle', title: 'Trung tâm trợ giúp', screen: 'HelpCenter' },
];

const purchaseItems = [
    { name: 'Chờ thanh toán', icon: 'wallet' },
    { name: 'Chờ giao hàng', icon: 'box' },
    { name: 'Đang giao', icon: 'truck' },
    { name: 'Đánh giá', icon: 'star' },
];

// --- REUSABLE LOCAL COMPONENTS ---
// Component con chỉ dùng trong file này

const UserProfileHeader = ({ user }: { user: User }) => (
    <View style={styles.headerContainer}>
        <Image
            source={{ uri: user.avatar }}
            style={styles.headerAvatar}
        />
        <View>
            <Text style={styles.headerUserName}>{user.fullName}</Text>
            <Text style={styles.headerUserSubtitle}>{user.role}</Text>
        </View>
    </View>
);

const MyPurchasesSection = ({ onViewAll }: { onViewAll: () => void }) => (
    <View style={styles.purchasesContainer}>
        <View style={styles.purchasesHeader}>
            <Text style={styles.purchasesTitle}>Đơn hàng của tôi</Text>
            <TouchableOpacity onPress={onViewAll}>
                <Text style={styles.purchasesViewAllText}>Xem lịch sử {'>'}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.purchasesItemsWrapper}>
            {purchaseItems.map(item => (
                <TouchableOpacity key={item.name} style={styles.purchaseItemContainer}>
                    <Icon name={item.icon} size={24} color="#555" />
                    <Text style={styles.purchaseItemText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const MenuItem = ({ icon, title, onPress }: { icon: string, title: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
        <Icon name={icon} size={18} style={styles.menuItemIcon} />
        <Text style={styles.menuItemTitle}>{title}</Text>
        {title !== 'Đăng xuất' && (
            <Icon name="chevron-right" size={14} style={styles.menuItemChevron} />
        )}
    </TouchableOpacity>
);

const MenuSection = ({ title, items, onItemPress, hideTitle = false }: {
    title?: string,
    items: { id: string, icon: string, title: string, screen: string | null }[],
    onItemPress: (item: any) => void,
    hideTitle?: boolean
}) => (
    <View style={styles.menuSectionContainer}>
        {!hideTitle && <Text style={styles.menuSectionTitle}>{title}</Text>}
        <View style={styles.menuItemsWrapper}>
            {items.map((item, index) => (
                <React.Fragment key={item.id}>
                    <MenuItem
                        icon={item.icon}
                        title={item.title}
                        onPress={() => onItemPress(item)}
                    />
                    {index < items.length - 1 && <View style={styles.menuSeparator} />}
                </React.Fragment>
            ))}
        </View>
    </View>
);


export default function AccountScreen({ navigation }: { navigation: TabsNav }) {
    const { user, logout } = useAuthContext();
    const { clearAllItems: clearCart } = useCartContext();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(refresh());
        logout();
        clearCart();
    };

    const handleNavigation = (item: { screen: string | null, title?: string }) => {
        if (item.screen) {
            navigation.navigate(item.screen as any, { title: item.title });
        } else {
            console.log("No screen defined for:", item.title);
        }
    };

    if (user) {
        return (
            <ScrollView style={styles.screenContainer}>
                <UserProfileHeader user={user} />
                <MyPurchasesSection
                    onViewAll={() => navigation.navigate('OrderHistory')}
                />
                <View style={styles.menuListContainer}>
                    <MenuSection
                        title="Tài khoản của tôi"
                        items={myAccountItems}
                        onItemPress={handleNavigation}
                    />
                    <MenuSection
                        title="Cài đặt & Hỗ trợ"
                        items={appSettingsItems}
                        onItemPress={handleNavigation}
                    />
                    <MenuSection
                        items={[{ id: 'logout', icon: 'sign-out-alt', title: 'Đăng xuất', screen: null }]}
                        onItemPress={handleLogout}
                    />
                </View>
            </ScrollView>
        );
    }

    // --- RENDER LOGGED OUT VIEW ---
    return (
        <View style={styles.authContainer}>
            <Image
                source={require('../../../assets/images/trendsetter.png')}
                style={styles.authLogo}
            />
            <Text style={styles.authDescriptionText}>
                Đăng nhập hoặc Tạo tài khoản để Mua, Bán, và{'\n'}Xem Dữ liệu Thị trường.
            </Text>
            <View style={styles.authButtonContainer}>
                <CustomButton title='Đăng ký' onPress={() => navigation.navigate('SignUp')} />
                <CustomButton title='Đăng nhập' outline onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    );
}

// --- ALL STYLES ---
const styles = StyleSheet.create({
    // General Container
    screenContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Light grey background
    },

    // Logged Out Styles
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 36,
        backgroundColor: 'white',
    },
    authLogo: {
        resizeMode: 'contain',
        marginBottom: 20,
    },
    authDescriptionText: {
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 22,
        fontSize: 16,
        color: '#2B2B2B',
    },
    authButtonContainer: {
        marginTop: 30,
        width: '100%',
        gap: 15,
    },

    // Logged In Styles
    // -- User Header
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF1E6', // A light, warm color
        gap: 15,
    },
    headerAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'white',
    },
    headerUserName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'capitalize',
    },
    headerUserSubtitle: {
        fontSize: 16,
        color: '#757575',
        marginTop: 4,
    },

    // -- Purchases Section
    purchasesContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        marginVertical: 12,
        marginHorizontal: 12,
        borderRadius: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    purchasesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    purchasesTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    purchasesViewAllText: { fontSize: 13, color: '#888' },
    purchasesItemsWrapper: { flexDirection: 'row', justifyContent: 'space-around' },
    purchaseItemContainer: { alignItems: 'center', gap: 8, flex: 1 },
    purchaseItemText: { fontSize: 12, color: '#444', textAlign: 'center' },

    // -- Menu List
    menuListContainer: {
        paddingHorizontal: 12,
        gap: 12,
        paddingBottom: 30,
    },
    menuSectionContainer: {},
    menuSectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#999',
        paddingHorizontal: 15,
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    menuItemsWrapper: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 15,
    },
    menuItemIcon: {
        width: 30,
        color: '#555',
        textAlign: 'center',
    },
    menuItemTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    menuItemChevron: {
        color: '#BBB',
    },
    menuSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#F0F0F0',
        marginLeft: 55, // Align with text after icon (30 width + 10 margin + 15 padding)
    },
});
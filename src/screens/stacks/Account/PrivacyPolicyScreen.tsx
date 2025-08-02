import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PrivacyPolicyScreenProps {
    navigation?: any;
}

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View style={styles.listItem}>
        <Text style={styles.bullet}>{'\u2022'}</Text>
        <Text style={styles.paragraph}>{children}</Text>
    </View>
);

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>

                    <Text style={{ fontSize: 28 }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chính sách Bảo mật</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.lastUpdated}>Cập nhật lần cuối: 20 tháng 10, 2023</Text>

                <Text style={styles.paragraph}>
                    Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Trendsetter. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
                </Text>

                <Text style={styles.sectionTitle}>1. Thông tin chúng tôi thu thập</Text>
                <Text style={styles.paragraph}>
                    Chúng tôi thu thập các loại thông tin sau để cung cấp và cải thiện dịch vụ:
                </Text>
                <ListItem>
                    <Text style={{ fontWeight: 'bold' }}>Thông tin bạn cung cấp:</Text> Tên, địa chỉ email, số điện thoại, địa chỉ giao hàng khi bạn đăng ký tài khoản hoặc đặt hàng.
                </ListItem>
                <ListItem>
                    <Text style={{ fontWeight: 'bold' }}>Thông tin giao dịch:</Text> Chi tiết về sản phẩm bạn mua, thông tin thanh toán (được xử lý an toàn qua cổng thanh toán của bên thứ ba).
                </ListItem>
                <ListItem>
                    <Text style={{ fontWeight: 'bold' }}>Thông tin sử dụng:</Text> Dữ liệu về cách bạn tương tác với ứng dụng như sản phẩm đã xem, lịch sử tìm kiếm, các mục trong giỏ hàng.
                </ListItem>

                <Text style={styles.sectionTitle}>2. Mục đích sử dụng thông tin</Text>
                <Text style={styles.paragraph}>
                    Thông tin của bạn được sử dụng cho các mục đích:
                </Text>
                <ListItem>Xử lý đơn hàng, giao hàng và hỗ trợ khách hàng.</ListItem>
                <ListItem>Cá nhân hóa trải nghiệm mua sắm, gợi ý sản phẩm phù hợp.</ListItem>
                <ListItem>Gửi thông báo về khuyến mãi, sản phẩm mới (nếu bạn đồng ý).</ListItem>
                <ListItem>Phân tích, cải thiện và bảo mật ứng dụng của chúng tôi.</ListItem>

                <Text style={styles.sectionTitle}>3. Chia sẻ thông tin</Text>
                <Text style={styles.paragraph}>
                    Chúng tôi không bán, cho thuê hay chia sẻ thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương mại. Chúng tôi chỉ có thể chia sẻ thông tin với:
                </Text>
                <ListItem>
                    <Text style={{ fontWeight: 'bold' }}>Đối tác vận chuyển:</Text> Để thực hiện việc giao hàng.
                </ListItem>
                <ListItem>
                    <Text style={{ fontWeight: 'bold' }}>Cổng thanh toán:</Text> Để xử lý các giao dịch một cách an toàn.
                </ListItem>
                <ListItem>
                    <Text style={{ fontWeight: 'bold' }}>Cơ quan pháp luật:</Text> Khi có yêu cầu hợp pháp.
                </ListItem>

                <Text style={styles.sectionTitle}>4. An toàn dữ liệu</Text>
                <Text style={styles.paragraph}>
                    Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ dữ liệu của bạn khỏi việc truy cập, thay đổi hoặc phá hủy trái phép. Mọi giao dịch thanh toán đều được mã hóa bằng công nghệ SSL.
                </Text>

                <Text style={styles.sectionTitle}>5. Quyền của bạn</Text>
                <Text style={styles.paragraph}>
                    Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình thông qua mục "Thiết lập Tài khoản" hoặc liên hệ với chúng tôi.
                </Text>

                <Text style={styles.sectionTitle}>6. Liên hệ</Text>
                <Text style={styles.paragraph}>
                    Nếu có bất kỳ câu hỏi nào về Chính sách Bảo mật, vui lòng liên hệ với chúng tôi qua email: <Text style={styles.emailText}>hotro@tenappcuaban.com</Text>.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 25,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: '#444',
        lineHeight: 26,
        textAlign: 'justify',
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    bullet: {
        fontSize: 16,
        marginRight: 10,
        color: '#444',
        lineHeight: 26,
    },
    emailText: {
        color: '#007AFF',
        fontWeight: '500',
    }
});

export default PrivacyPolicyScreen;
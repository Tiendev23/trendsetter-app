import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Giả sử bạn dùng React Navigation

// Import icon từ thư viện đã cài đặt
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Định nghĩa kiểu dữ liệu cho TypeScript
type SupportCategory = {
  id: string;
  title: string;
  iconName: string;
  // Cho phép dùng nhiều bộ icon khác nhau
  iconSet: 'Feather' | 'MaterialCommunityIcons'; 
};

type FaqItem = {
  id: string;
  question: string;
};

// --- Dữ liệu mẫu (sau này bạn sẽ lấy từ API) ---

const supportCategories: SupportCategory[] = [
  { id: 'don-hang', title: 'Đơn Hàng & Vận Chuyển', iconName: 'package', iconSet: 'Feather' },
  { id: 'thanh-toan', title: 'Thanh Toán & Khuyến Mãi', iconName: 'credit-card', iconSet: 'Feather' },
  { id: 'san-pham', title: 'Sản Phẩm & Chất Lượng', iconName: 'sneaker', iconSet: 'MaterialCommunityIcons' },
  { id: 'tra-hang', title: 'Trả Hàng & Hoàn Tiền', iconName: 'arrow-left-circle', iconSet: 'Feather' },
  { id: 'xac-thuc', title: 'Xác Thực & Bảo Hành', iconName: 'shield-check', iconSet: 'MaterialCommunityIcons' },
  { id: 'tai-khoan', title: 'Tài Khoản & Bảo Mật', iconName: 'user', iconSet: 'Feather' },
];

const faqData: FaqItem[] = [
  { id: '1', question: 'Làm thế nào để kiểm tra một đôi giày là hàng chính hãng?' },
  { id: '2', question: 'Chính sách trả hàng của bạn như thế nào?' },
  { id: '3', question: 'Thời gian giao hàng dự kiến là bao lâu?' },
  { id: '4', question: 'Tôi có thể hủy đơn hàng đã đặt không?' },
];

const HelpCenterScreen = ({navigation}:{navigation:any}) => {
  const handleCategoryPress = (categoryId: string) => {
    console.log(`Chuyển đến trang danh mục: ${categoryId}`);
    // navigation.navigate('CategoryDetail', { id: categoryId });
  };

  const handleFaqPress = (faqId: string) => {
    console.log(`Mở câu hỏi FAQ: ${faqId}`);
    // navigation.navigate('FaqDetail', { id: faqId });
  };

  const renderCategoryItem = ({ item }: { item: SupportCategory }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item.id)}>
      {item.iconSet === 'Feather' ? (
        <Feather name={item.iconName} size={28} color="#333" />
      ) : (
        <MaterialCommunityIcons name={item.iconName} size={28} color="#333" />
      )}
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={28} color="#111" />
            </TouchableOpacity>
          <Text style={styles.headerTitle}>Trung Tâm Hỗ Trợ</Text>
        </View>

        {/* Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Bạn cần hỗ trợ về vấn đề gì?"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* Các chủ đề hỗ trợ */}
        <Text style={styles.sectionTitle}>Chủ Đề Hỗ Trợ</Text>
        <FlatList
          data={supportCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false} 
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />

        {/* Câu hỏi thường gặp */}
        <Text style={styles.sectionTitle}>Câu Hỏi Thường Gặp</Text>
        <View style={styles.faqList}>
          {faqData.map((item, index) => (
            <TouchableOpacity key={item.id} style={[styles.faqItem, index === faqData.length - 1 && { borderBottomWidth: 0 }]} onPress={() => handleFaqPress(item.id)}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Feather name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Các kênh liên hệ */}
        <Text style={styles.sectionTitle}>Cần Trợ Giúp Thêm?</Text>
        <View style={styles.contactContainer}>
            <TouchableOpacity style={styles.contactButton}>
                <Feather name="message-circle" size={22} color="#007AFF" />
                <Text style={styles.contactText}>Chat với chúng tôi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
                <Feather name="mail" size={22} color="#34C759" />
                <Text style={styles.contactText}>Gửi yêu cầu hỗ trợ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
                <Feather name="phone-call" size={22} color="#FF3B30" />
                <Text style={styles.contactText}>Hotline: 1900 1234</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 16,
    alignItems: 'flex-start', // Center nếu không có nút back
    flexDirection: 'row', // Bật nếu có nút back
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginLeft:80
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#111',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 24,
    marginBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start', 
    width: '48%', 
    marginBottom: 16,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  faqList: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  faqQuestion: {
    fontSize: 16,
    color: '#111',
    flex: 1, 
    marginRight: 8,
  },
  contactContainer: {
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginLeft: 12,
  },
});

export default HelpCenterScreen;
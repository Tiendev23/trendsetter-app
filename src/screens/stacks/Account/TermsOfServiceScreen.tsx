// src/screens/TrendsetterTOSScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface SectionProps {
  iconName: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ iconName, title, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Icon name={iconName} size={22} color="#4A4A4A" style={styles.iconStyle} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <Text style={styles.paragraph}>{children}</Text>
  </View>
);

// Màn hình chính
const TermsOfServiceScreen: React.FC = () => {
  const contactEmail = 'support@trendsetter.com';
  const websiteUrl = 'https://trendsetter.com/contact';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainTitle}>Điều khoản Dịch vụ</Text>
        <Text style={styles.lastUpdated}>Cập nhật lần cuối: 24 tháng 10, 2023</Text>

        <Section iconName="award" title="1. Chào mừng đến với Trendsetter!">
          Trendsetter ("Chúng tôi") là nền tảng nơi bạn có thể chia sẻ phong cách cá nhân, khám phá xu hướng thời trang và kết nối với một cộng đồng sáng tạo. Bằng việc sử dụng ứng dụng, bạn đồng ý với các điều khoản này.
        </Section>

        <Section iconName="user" title="2. Tài khoản của bạn">
          Bạn chịu trách nhiệm cho mọi hoạt động diễn ra trên tài khoản của mình. Hãy giữ mật khẩu an toàn và không chia sẻ cho bất kỳ ai. Bạn phải đủ 13 tuổi để tạo tài khoản trên Trendsetter.
        </Section>

        <Section iconName="camera" title="3. Nội dung do Bạn Tạo ra">
          Bạn sở hữu mọi bản quyền đối với hình ảnh, video và văn bản ("Nội dung") bạn đăng tải. Tuy nhiên, khi đăng tải, bạn cấp cho Trendsetter quyền miễn phí, không độc quyền, trên toàn cầu để hiển thị, chỉnh sửa định dạng và phân phối lại Nội dung của bạn trên các dịch vụ của chúng tôi.
        </Section>

        <Section iconName="heart" title="4. Quy tắc Cộng đồng Trendsetter">
          Chúng tôi mong muốn xây dựng một không gian an toàn và tích cực. Vui lòng không đăng tải nội dung bạo lực, thù địch, khiêu dâm, hoặc vi phạm bản quyền. Hãy tôn trọng các thành viên khác.
        </Section>
        
        <Section iconName="shield" title="5. Sở hữu Trí tuệ">
          Logo, thương hiệu, và giao diện của Trendsetter là tài sản của chúng tôi. Vui lòng không sao chép hoặc sử dụng mà không có sự cho phép. Hãy tôn trọng quyền sở hữu trí tuệ của người khác khi đăng tải Nội dung.
        </Section>

        <Section iconName="shopping-cart" title="6. Giao dịch qua Nền tảng">
          Trendsetter có thể chứa các liên kết đến sản phẩm của bên thứ ba. Mọi giao dịch mua bán được thực hiện giữa bạn và nhà cung cấp. Chúng tôi không chịu trách nhiệm về chất lượng sản phẩm hay quá trình giao dịch.
        </Section>

        <Section iconName="slash" title="7. Chấm dứt tài khoản">
          Chúng tôi có quyền tạm ngưng hoặc chấm dứt vĩnh viễn tài khoản của bạn nếu bạn vi phạm nghiêm trọng hoặc nhiều lần các điều khoản và quy tắc cộng đồng của chúng tôi mà không cần báo trước.
        </Section>
        
        <Section iconName="alert-triangle" title="8. Giới hạn Trách nhiệm">
          Dịch vụ được cung cấp "nguyên trạng". Trendsetter không đảm bảo ứng dụng sẽ luôn hoạt động hoàn hảo và không chịu trách nhiệm cho bất kỳ tổn thất gián tiếp nào phát sinh từ việc sử dụng ứng dụng.
        </Section>

        <Section iconName="refresh-cw" title="9. Cập nhật Điều khoản">
          Thế giới thời trang luôn thay đổi, và điều khoản của chúng tôi cũng vậy. Chúng tôi sẽ thông báo cho bạn khi có những cập nhật quan trọng. Việc tiếp tục sử dụng ứng dụng sau khi cập nhật đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
        </Section>

        <Section iconName="send" title="10. Liên hệ">
          Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi:
          {'\n'}
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${contactEmail}`)}>
            <Text>• Email: <Text style={styles.link}>{contactEmail}</Text></Text>
          </TouchableOpacity>
          {'\n'}
          <TouchableOpacity onPress={() => Linking.openURL(websiteUrl)}>
            <Text>• Website: <Text style={styles.link}>{websiteUrl}</Text></Text>
          </TouchableOpacity>
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
    textAlign: 'center',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#8A8A8E',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconStyle: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1D1D1F',
    flex: 1, 
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26, 
    color: '#333333',
  },
  link: {
    color: '#006340', 
    textDecorationLine: 'underline',
  },
});

export default TermsOfServiceScreen;
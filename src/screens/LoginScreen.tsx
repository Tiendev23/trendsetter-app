import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { validateEmail, validatePassword } from '../utils/validation';

export default function LoginScreen({ navigation }: any) {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // if (!auth) return null;

  const onLogin = () => {
    if (!validateEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Lỗi', 'Mật khẩu phải từ 6 ký tự trở lên');
      return;
    }
    if (auth.login(email, password)) {
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      // Chuyển màn hình sau đăng nhập ở đây
    } else {
      Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Quên mật khẩu?
      </Text>
        <CustomButton title="Đăng nhập" onPress={onLogin} />
      
      
      
      <Text style={styles.textRegister}>
        Bạn chưa có tài khoản?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Đăng ký ngay
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center',backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, textAlign: 'left' },
  link: { color: '#006340', marginVertical: 10, textAlign: 'center' },
  textRegister: { marginTop: 30, textAlign: 'center' },
});

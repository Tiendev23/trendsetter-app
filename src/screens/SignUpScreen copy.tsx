import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { validateEmail, validatePassword } from '../utils/validation';

export default function SignUpScreen({ navigation }: any) {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!auth) return null;

  const onSignUp = () => {
    if (!validateEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Lỗi', 'Mật khẩu phải từ 6 ký tự trở lên');
      return;
    }
    if (auth.register(email, password)) {
      Alert.alert('Thành công', 'Đăng ký thành công!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Lỗi', 'Email đã được đăng ký');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton title="Đăng ký" onPress={onSignUp} />
      <Text style={styles.textLogin}>
        Bạn đã có tài khoản?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Đăng nhập ngay
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
  textLogin: { marginTop: 30, textAlign: 'center' },
});

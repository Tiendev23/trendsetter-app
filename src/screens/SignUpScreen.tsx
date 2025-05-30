import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { validateEmail, validatePassword } from '../utils/validation';

export default function SignUpScreen({ navigation }: any) {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // if (!auth) return null;

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
      <CustomInput
        placeholder="Xác nhận mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={{marginVertical:20, color:'#6A6A6A'}}>Atleast 8 charaters, 1 uppercase letter, 1 number & 1 symbol</Text>
      <CustomButton title="Đăng ký" onPress={onSignUp} />
      <Text style={styles.textLogin}>
        Bạn đã có tài khoản?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Đăng nhập ngay
        </Text>
      </Text>
        <View style={{flexDirection:'row', alignSelf:'center'}}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Login with Facebook')}>
        <Image source={require('../image/fb.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Login with Facebook')}>
        <Image source={require('../image/search.png')} style={styles.icon} />
      </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center',backgroundColor: '#fff'  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, textAlign: 'left' },
  link: { color: '#006340', marginTop: 10, textAlign: 'center' },
  textLogin: { marginVertical: 30, textAlign: 'center' },
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 12,
    resizeMode: 'contain',
  },
});

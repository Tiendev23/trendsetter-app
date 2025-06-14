import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
// import { AuthContext } from '../../contexts/AuthContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmail } from '../../utils/validation';

export default function ForgotPasswordScreen({ navigation }: any) {
    // const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');

    // if (!auth) return null;

    // const onReset = () => {
    //   if (!validateEmail(email)) {
    //     Alert.alert('Lỗi', 'Email không hợp lệ');
    //     return;
    //   }
    //   if (auth.forgotPassword(email)) {
    //     Alert.alert('Thành công', 'Email hợp lệ. Hướng dẫn reset mật khẩu đã được gửi!');
    //     navigation.navigate('Login');
    //   } else {
    //     Alert.alert('Lỗi', 'Email chưa đăng ký');
    //   }
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
            <CustomButton title="Gửi yêu cầu" onPress={null} />
            {/* <CustomButton title="Gửi yêu cầu" onPress={onReset} /> */}
            <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
            >
                Quay lại đăng nhập
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    title: { fontSize: 28, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
    link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});

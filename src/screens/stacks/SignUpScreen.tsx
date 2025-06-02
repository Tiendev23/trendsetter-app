import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { AuthContext } from '../contexts/AuthContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmail, validatePassword } from '../../utils/validation';
import CustomDirectionButton from '../../components/CustomDirectionButton';
import AuthScreenHeader from '../../components/AuthScreenHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function SignUpScreen({ navigation }: any) {
    // const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // if (!auth) return null;

    // const onSignUp = () => {
    //   if (!validateEmail(email)) {
    //     Alert.alert('Lỗi', 'Email không hợp lệ');
    //     return;
    //   }
    //   if (!validatePassword(password)) {
    //     Alert.alert('Lỗi', 'Mật khẩu phải từ 6 ký tự trở lên');
    //     return;
    //   }
    //   if (auth.register(email, password)) {
    //     Alert.alert('Thành công', 'Đăng ký thành công!');
    //     navigation.navigate('Login');
    //   } else {
    //     Alert.alert('Lỗi', 'Email đã được đăng ký');
    //   }
    // };

    return (
        <View style={styles.screenContainer}>
            <AuthScreenHeader />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Đăng ký</Text>
                <CustomInput placeholder="Tên" value={email} onChangeText={setEmail} />
                <CustomInput placeholder="Họ" value={email} onChangeText={setEmail} />
                <CustomInput placeholder="Địa chỉ email" value={email} onChangeText={setEmail} />
                <CustomInput
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    type='password'
                    secureTextEntry
                />
                <Text style={styles.textDescription}>
                    Ít nhất 8 ký tự, 1 chữ cái viết hoa, 1 số và 1 ký hiệu
                </Text>
                <View style={styles.buttonWrapper}>
                    <CustomButton title="Đăng ký" onPress={null} />
                </View>

                <View style={styles.socialContainer}>
                    <TouchableOpacity
                        style={styles.socialWrapper}
                        onPress={() => console.log('Login with Google')}
                    >
                        <Image
                            source={require('../../../assets/icons/logo_google.png')}
                            style={styles.social}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.socialWrapper}
                        onPress={() => console.log('Login with Facebook')}
                    >
                        <Ionicons name="logo-facebook" size={32} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.socialWrapper}
                        onPress={() => console.log('Login with X')}
                    >
                        <FontAwesome6 name="x-twitter" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.textDescription}>
                    Bạn đã có tài khoản?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                        Đăng nhập
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: '8%',
        paddingTop: 10,
        gap: 18
    },
    title: {
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        fontSize: 16,
        color: '#1A2530',
    },
    link: {
        textAlign: 'right',
        color: '#006340',
    },
    textDescription: {
        textAlign: 'center',
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        color: '#6A6A6A'
    },
    buttonWrapper: {
        marginVertical: 12,
    },
    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14
    },
    socialWrapper: {
        padding: 10,
    },
    social: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

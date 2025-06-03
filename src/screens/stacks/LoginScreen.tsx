import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AuthScreenHeader from '../../components/AuthScreenHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/slices/userSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { AppContext } from '../../contexts/Appcontext';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AppContext);
    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useSelector((state: RootState) => state.userActions)

    const handleLogin = () => {
        console.log('email', email, '\npassword', password);
        dispatch(login({ email, password }));
    }

    useEffect(() => {
        if (status === 'succeeded') {
            setUser(user);
            navigation.navigate('Tabs');
        };
        if (status === 'failed') {
            console.log('Đăng nhập thất bại:', error);
            setTimeout(() => {
                dispatch(logout());
            }, 3000);
        }
    }, [status])

    return (
        <View style={styles.screenContainer}>
            <AuthScreenHeader />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Đăng nhập</Text>
                <CustomInput placeholder="Địa chỉ email" value={email} onChangeText={setEmail} />
                <CustomInput
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    type='password'
                    secureTextEntry
                />
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    Quên mật khẩu?
                </Text>
                <View style={styles.buttonWrapper}>
                    <CustomButton title="Đăng nhập" onPress={handleLogin} />
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
                <Text style={styles.textRegister}>
                    Bạn chưa có tài khoản?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
                        Đăng ký
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
    textRegister: {
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

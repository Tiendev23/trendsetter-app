import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import AuthScreenHeader from '../../components/AuthScreenHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { refresh, register } from '../../redux/features/auth/registerSlice';
import { SignUpNav } from '../../navigation/NavigationTypes';
import ErrorWarnBox from '../../components/ErrorWarnBox';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { validateEmail, validateFullName, validatePassword, validateUsername } from '../../utils/validateForm';

export default function SignUp({ navigation }: { navigation: SignUpNav }) {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMess, setErrorMess] = useState('');

    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.register);
    console.log('>>>>>>>>>>>>\n', navigation.getState().routes);
    const handleRegister = () => {
        if (!validateFullName(fullName)) {
            setErrorMess('Họ và tên không hợp lệ');
            return;
        }
        if (!validateUsername(username)) {
            setErrorMess('Tên đăng nhập không hợp lệ');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMess('Email không đúng định dạng');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMess('Mật khẩu không hợp lệ');
            return;
        }

        dispatch(register({
            username, password, email, fullName, role: 'customer'
        }))
    }

    useEffect(() => {
        if (status === 'succeeded') {
            console.log('data SignUp', data);
            navigation.reset({
                routes: [{
                    name: 'Login',
                    params: { email: data.email }
                }],
            });
            // navigation.navigate({ name: 'Login', params: { email: data.email } });
        }
        if (status === 'failed') {
            console.log('Đăng ký thất bại:', error);
            setTimeout(() => {
                setErrorMess('');
                dispatch(refresh());
            }, 5000);
        }
    }, [status])

    return (
        <View style={styles.screenContainer}>
            <AuthScreenHeader />

            <View style={styles.contentContainer}>
                <ErrorWarnBox content={errorMess} />

                <Text style={styles.title}>Đăng Ký</Text>
                <View>
                    <CustomInput
                        placeholder="Họ và tên"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>
                <View>
                    <CustomInput
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChangeText={setUsername}
                        infoText='ít nhất 3 ký tự, không chứa ký tự đặc biệt'
                    />
                </View>
                <View>
                    <CustomInput
                        placeholder="Địa chỉ email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View>
                    <CustomInput
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        type='password'
                        infoText={"Tối thiểu 8 kí tự,\ngồm chữ thường, chữ hoa, số và ký tự đặc biệt"}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <CustomButton title="Đăng ký" onPress={handleRegister} />
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
                    <Text style={styles.link}
                        onPress={() => {
                            navigation.reset({
                                routes: [{ name: 'Login' }],
                            });
                        }}
                    >
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
        paddingHorizontal: 30,
        paddingTop: 10,
        gap: 18
    },
    title: {
        fontFamily: 'Raleway',
        fontWeight: '700',
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

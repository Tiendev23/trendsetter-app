import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { login, refresh } from '../../redux/features/auth/loginSlice';
import { AuthContext } from '../../contexts/AuthContext';
import { LoginNav, LoginRoute } from '../../navigation/NavigationTypes';
import ErrorWarnBox from '../../components/ErrorWarnBox';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { resetPreRoute, setPrevRoute } from '../../redux/features/navigation/navigateSlice';
import ChevronButton from '../../components/buttons/ChevronButton';

export default function Login({ navigation, route }: { navigation: LoginNav; route: LoginRoute }) {
    const { email } = route.params || {};
    const { setEmail } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState(route.params?.email || '');
    const [password, setPassword] = useState('');
    const [errorMess, setErrorMess] = useState('');

    const context = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (prevRoute) return;
        dispatch(setPrevRoute(navigation.getState().routes[0]));
    }, []);
    const prevRoute = useAppSelector(state => state?.navRoute.prevRoute);

    const handleLogin = () => {
        dispatch(login({ emailOrUsername: inputValue, password: password }));
    };

    useEffect(() => {
        if (status === 'succeeded') {
            dispatch(resetPreRoute());
            context.login(data.user, data.token);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Tabs' }],
            });
        };
        if (status === 'failed') {
            console.log('Đăng nhập thất bại:', error);
            setErrorMess(error)
            setTimeout(() => {
                setErrorMess('');
                dispatch(refresh());
            }, 5000);
        }
    }, [status])

    return (
        <View style={styles.screenContainer}>
            <ScreenHeader
                title='Trendsetter'
                titleStyle={{
                    fontSize: 30,
                    fontStyle: 'italic'
                }}
                leftButton={
                    <ChevronButton
                        direction="back"
                        onPress={() => {
                            const tabState = prevRoute?.state;
                            const activeIndex = tabState?.index ?? 0;
                            if (!prevRoute || !tabState || !tabState.routes) {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Tabs' }],
                                });
                                return;
                            }
                            dispatch(resetPreRoute())
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: prevRoute.name,
                                        state: {
                                            index: activeIndex,
                                            routes: tabState.routes.map(route => ({
                                                name: route.name,
                                                params: route.params,
                                            }))
                                        }
                                    }
                                ]
                            });
                        }}
                    />
                }
            />

            <View style={styles.contentContainer}>
                <ErrorWarnBox content={errorMess} />

                <Text style={styles.title}>Đăng nhập</Text>
                <CustomInput
                    placeholder="Địa chỉ email / Tên đăng nhập"
                    value={inputValue}
                    onChangeText={setInputValue}
                />
                <CustomInput
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    type='password'
                />
                <Text
                    style={styles.link}
                    onPress={() => {
                        setEmail('');
                        navigation.navigate('ForgotPasswordScreen')
                    }
                    }
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
                    <Text style={styles.link}
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                    >
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

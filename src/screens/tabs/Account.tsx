import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import AccountTabSection from '../../components/AccountTabSection';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../contexts/AuthContext';
import { useAppDispatch } from '../../redux/hooks';
import { refresh } from '../../redux/features/auth/loginSlice';

export default function Account({ navigation }) {
    const { user, logout } = useContext(AuthContext);
    const { height } = useWindowDimensions();
    const [contentHeight, setContentHeight] = useState(0);
    const dispatch = useAppDispatch();

    return (
        <View style={styles.screenContainer}>
            {
                user ?
                    <>
                        <View style={styles.userSection}>
                            <Image
                                source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/610Y2DFPlBL._RI_.jpg' }} // avatar
                                height={100}
                                style={styles.userAvatar}
                            />
                            <Text style={styles.userName}>
                                {user.fullName.toLowerCase()}
                            </Text>
                        </View>
                        <ScrollView scrollEnabled={contentHeight > height}>
                            <View
                                style={styles.menuContainer}
                                onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
                            >
                                <View style={styles.menuWrapper}>
                                    <AccountTabSection
                                        title='Hồ sơ'
                                        label='Profile'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Giỏ hàng'
                                        label='My Cart'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Yêu thích'
                                        label='Favorite'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Đơn hàng'
                                        label='Orders'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Ví'
                                        label='Wallet'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Cài đặt'
                                        label='Settings'
                                        onPress={null}
                                    />
                                </View>
                                <View style={styles.separatorLine} />
                                <View style={styles.menuWrapper}>
                                    <AccountTabSection
                                        title='Đăng xuất'
                                        label='Sign Out'
                                        onPress={() => {
                                            dispatch(refresh());
                                            logout();
                                        }}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </>
                    :
                    <>
                        <View style={styles.authContainer}>
                            <Image
                                source={require('../../../assets/images/trendsetter.png')}
                            />
                            <Text style={styles.descriptionText}>
                                Đăng nhập hoặc Tạo tài khoản để Mua, Bán, và{'\n'}Xem Dữ liệu Thị trường.
                            </Text>

                            <CustomButton title='Đăng ký' onPress={() => navigation.navigate('SignUp')} />
                            <CustomButton title='Đăng nhập' outlineStyle onPress={() => navigation.navigate('Login')} />
                        </View>
                    </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingHorizontal: 18,
        backgroundColor: 'white'
    },
    userSection: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        gap: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userAvatar: {
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    userName: {
        fontWeight: 'medium',
        fontSize: 20,
        color: '#2B2B2B',
        textTransform: 'capitalize'
    },
    menuContainer: {
        flexDirection: 'column',
        gap: 1,
    },
    menuWrapper: {
        marginVertical: 8,
    },
    separatorLine: {
        height: 1,
        backgroundColor: '#2B2B2B',
        marginHorizontal: 36,
    },

    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 18,
    },
    descriptionText: {
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.1,
        color: '#2B2B2B'
    },
})
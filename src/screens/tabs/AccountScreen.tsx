import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import AccountTabSection from '../../components/AccountTabSection';
import CustomButton from '../../components/CustomButton';
import { AppContext } from '../../contexts/Appcontext';

export default function AccountScreen({ navigation }) {
    const { user } = useContext(AppContext);
    const { height } = useWindowDimensions();
    const [contentHeight, setContentHeight] = useState(0);

    return (
        <View style={styles.screenContainer}>
            {
                user ?
                    <>
                        <View style={styles.userSection}>
                            <Image
                                source={{ uri: '' }} // avatar
                                height={100}
                                style={styles.userAvatar}
                            />
                            <Text style={styles.userName}>
                                {user.fullname.toLowerCase()}
                            </Text>
                        </View>
                        <ScrollView scrollEnabled={contentHeight > height}>
                            <View
                                style={styles.menuContainer}
                                onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
                            >
                                <View style={styles.menuWrapper}>
                                    <AccountTabSection
                                        title='Profile'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='My Cart'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Favorite'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Orders'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Wallet'
                                        onPress={null}
                                    />
                                    <AccountTabSection
                                        title='Settings'
                                        onPress={null}
                                    />
                                </View>
                                <View style={styles.separatorLine} />
                                <View style={styles.menuWrapper}>
                                    <AccountTabSection
                                        title='Sign Out'
                                        onPress={null}
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
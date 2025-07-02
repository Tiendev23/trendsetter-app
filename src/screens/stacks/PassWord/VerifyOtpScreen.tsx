import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { ScrollView, TextInput } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Backnav from '../../../components/Tabbar/Backnav';

const VerifyOtp = ({ navigation, route }) => {
    const inputRefs = useRef([]);
    const { email } = route.params;

    const [otp, setOtp] = useState(Array(6).fill(''));

    return (
        <View style={styles.container}>
            <Backnav navigation={navigation} />
            <ScrollView>
                <View style={styles.inputGroup}>
                    <View style={styles.container_content}>
                        <Text style={styles.txttitle}>Kiểm tra email của bạn</Text>
                        <Text style={styles.txtsub}>Đã gửi mã xát nhận đến <Text style={[styles.txtsub, { color: 'black', fontWeight: 'bold' }]}>{email}</Text> Vui lòng nhâp 5 chữ số được đề cập trong email</Text>
                    </View>
                    <View style={styles.labelRow}>
                        <MaterialCommunityIcons name="shield-key-outline" size={20} color="#006340" />
                        <Text style={styles.label}>Nhập mã OTP</Text>
                    </View>
                    <View>
                        <View style={styles.otpcontainer}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <TextInput key={index}
                                    ref={(ref) => { inputRefs.current[index] = ref }}
                                    keyboardType='number-pad'
                                    value={otp[index]}
                                    style={styles.inputotp}
                                    maxLength={1}
                                    onChangeText={(Number) => {
                                        const newOtp = [...otp];
                                        newOtp[index] = Number;
                                        setOtp(newOtp)

                                        if (Number && index < 5) {
                                            inputRefs.current[index + 1]?.focus();
                                        }

                                    }}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
                                            inputRefs.current[index - 1]?.focus();
                                        }
                                    }} />
                            ))}
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.codeButtonText}>Gửi lại mã</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.saveButton, otp.includes('') && styles.disabledButton]} disabled={otp.includes('')}
                        onPress={() => {
                            const code = otp.join('');
                            navigation.replace("ChangePassword");
                        }} >
                        <Text style={styles.saveText}>Tiếp theo</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </View>
    )
}

export default VerifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    inputGroup: {
        margin: 20,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    label: {
        marginLeft: 8,
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 18,
        height: 57,
        width: 376
    },
    saveButton: {
        backgroundColor: '#006340',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 35,
    },
    disabledButton: {
        opacity: 0.4
    },
    saveText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    otpcontainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 12,

    },
    inputotp: {
        width: 48,
        height: 58,
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#fff',
    },
    container_content: {
        marginTop: 10,
        marginBottom: 33,

    },
    txttitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    txtsub: {
        fontSize: 16,
        color: '#989898',
    },
    codeButtonText: {
        color: '#006340',
        fontWeight: '600',
        fontSize: 14,
        right: 30,
        position: 'absolute',
    },
})
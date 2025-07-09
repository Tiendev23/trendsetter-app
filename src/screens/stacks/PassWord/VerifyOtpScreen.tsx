import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Backnav from '../../../components/Tabbar/Backnav';
import { sendEmail, verifyOtp } from '../../../redux/features/forgotPassword/sendEmailSlice';
import { AppDispatch, RootState } from '../../../redux/store';

const VerifyOtp = ({ navigation, route }) => {
    const inputRefs = useRef([]);
    const { email } = route.params;
    const dispatch = useDispatch<AppDispatch>();

    const [otp, setOtp] = useState(Array(6).fill(''));
    const [countdown, setCountdown] = useState(120);
    const [resendSuccess, setResendSuccess] = useState(false);
    const { loading, data, error } = useSelector((state: RootState) => state.sendEmail);
    const isloading = loading == "loading";
    useEffect(() => {
        startCountdown();
        return () => clearInterval(timerRef.current);
    }, []);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startCountdown = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setResendSuccess(false); 

        setCountdown(120); // reset thời gian
        timerRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    clearInterval(timerRef.current!);
                    setResendSuccess(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };


    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    const handleVerifyOtp = async () => {
        const code = otp.join('');
        try {
            const resultAction = await dispatch(verifyOtp({ email, otp: code }));
            if (verifyOtp.fulfilled.match(resultAction)) {
                navigation.replace("ChangePasswordScreen");
            } else {
                Alert.alert("Lỗi", resultAction.payload as string);
            }
        } catch (err) {
            Alert.alert("Lỗi", "Không thể xác thực OTP.");
        }
    };

    return (
        <View style={styles.container}>
            <Backnav navigation={navigation} />
            <ScrollView>
                <View style={styles.inputGroup}>
                    <View style={styles.container_content}>
                        <Text style={styles.txttitle}>Kiểm tra email của bạn</Text>
                        <Text style={styles.txtsub}>
                            Đã gửi mã xác nhận đến <Text style={[styles.txtsub, { color: 'black', fontWeight: 'bold' }]}>{email}</Text>.
                            Vui lòng nhập 6 chữ số được đề cập trong email.
                        </Text>
                    </View>

                    <View style={styles.labelRow}>
                        <MaterialCommunityIcons name="shield-key-outline" size={20} color="#006340" />
                        <Text style={styles.label}>Nhập mã OTP</Text>
                    </View>

                    <View>
                        <View style={styles.otpcontainer}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { inputRefs.current[index] = ref }}
                                    keyboardType='number-pad'
                                    value={otp[index]}
                                    style={styles.inputotp}
                                    maxLength={1}
                                    onChangeText={(Number) => {
                                        const newOtp = [...otp];
                                        newOtp[index] = Number;
                                        setOtp(newOtp);

                                        if (Number && index < 5) {
                                            inputRefs.current[index + 1]?.focus();
                                        }
                                    }}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
                                            inputRefs.current[index - 1]?.focus();
                                        }
                                    }}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            disabled={countdown > 0 || isloading}
                            onPress={async () => {
                                const resultAction = await dispatch(sendEmail(email));
                                if (sendEmail.fulfilled.match(resultAction)) {
                                    startCountdown();
                                    setResendSuccess(true);
                                } else {
                                    setResendSuccess(false);
                                    Alert.alert("Lỗi", resultAction.payload as string || "Gửi mã OTP thất bại!");
                                }
                            }}

                        >
                            <Text style={[
                                styles.codeButtonText,
                                resendSuccess && { color: '#28a745', fontWeight: 'bold' } 
                            ]}>
                                {resendSuccess
                                    ? `Đã gửi lại mã (${formatTime(countdown)})`
                                    : countdown > 0
                                        ? `Gửi lại mã (${formatTime(countdown)})`
                                        : 'Gửi lại mã'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, otp.includes('') && styles.disabledButton]}
                        disabled={otp.includes('')}
                        onPress={handleVerifyOtp}
                    >
                        <Text style={styles.saveText}>Tiếp theo</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default VerifyOtp;

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
        width: 376,
    },
    saveButton: {
        backgroundColor: '#006340',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 35,
    },
    disabledButton: {
        opacity: 0.4,
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
});

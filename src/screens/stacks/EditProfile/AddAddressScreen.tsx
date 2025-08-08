import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import { createAddress, fetchAddress } from '../../../redux/features/addresses/addressesSlice';
import { AppDispatch } from '../../../redux/store';
import { styles as Styles } from '../Account/AddressListScreen';
import { SwitchRow } from '../Account/Profile';
import Toast from 'react-native-toast-message';


export const AddressCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            {children}
        </View>
    );
};

export interface LabelValueProps {
    label: string;
    value: string;
    onChangeText?: (text: string) => void;
}

export const LabelValueBox: React.FC<LabelValueProps> = ({ label, value, onChangeText }) => {
    return (
        <View style={styles.labelValueBox}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={`Nhập ${label.toLowerCase()}`}
            />
        </View>
    );
};
const AddAddressScreen = ({ navigation, route }) => {
    const { _id } = route.params;

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [streetDetails, setStreetDetails] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const [showSuccess, setShowSuccess] = useState(false);

    const isValidPhoneNumber = (phone: string): boolean => {
        const phoneRegex = /^(0|\+84)(\d{9})$/;
        return phoneRegex.test(phone);
    };

    const handleAddAddress = async () => {
        if (!fullName || !phone || !city || !ward || !streetDetails) {
    Toast.show({
      type: 'error',
      text1: 'Thiếu thông tin',
      text2: 'Vui lòng điền đầy đủ các trường bắt buộc.',
    });
    return;
  }

  if (!isValidPhoneNumber(phone)) {
    Toast.show({
      type: 'error',
      text1: 'Số điện thoại sai định dạng',
      text2: 'Vui lòng kiểm tra lại số điện thoại.',
    });
    return;
  }

  const newAddressData = {
    fullName,
    phone,
    city,
    ward,
    streetDetails,
    isDefault: isEnabled,
  };

  try {
    await dispatch(createAddress({
      userId: _id,
      addressData: newAddressData
    })).unwrap();
    setShowSuccess(true);
    setTimeout(() => {
      dispatch(fetchAddress({ _id }));
      navigation.goBack();
    }, 2000);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Lỗi hệ thống',
      text2: 'Không thể thêm địa chỉ. Vui lòng thử lại.',
    });
    console.error("Lỗi thêm địa chỉ:", error);
  }
};

    if (showSuccess) {
        return (
            <View style={styles.successContainer}>
                <View style={styles.successCircle}>
                    <MaterialCommunityIcons name="check" size={60} color="#088A2D" />
                </View>
                <Text style={styles.Circletitle}>Thêm địa chỉ thành công!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScreenHeader title="Thêm địa chỉ" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <AddressCard title="Thông tin người nhận">
                    <LabelValueBox label='Họ tên' value={fullName} onChangeText={setFullName} />
                    <LabelValueBox label="Số điện thoại" value={phone} onChangeText={setPhone} />
                </AddressCard>

                <AddressCard title="Địa chỉ giao hàng">
                    <View style={styles.labelValueBox}>
                        <Text style={styles.label}>Tỉnh / Thành, Phường / Xã</Text>
                        <TouchableOpacity style={{ marginTop: 4, gap: 8 }} onPress={() => {
                            navigation.navigate('LocationScreen', {
                                currentData: { city, district, ward, streetDetails },
                                onSelectLocation: (newLocation: any) => {
                                    setCity(newLocation.city);
                                    setWard(newLocation.ward);
                                    setStreetDetails(newLocation.streetDetails);
                                }
                            });
                        }}>
                            <View style={styles.rowWithIcon}>
                                <Text style={styles.infoText}>{city || 'Chọn thành phố'}</Text>
                                <Ionicons name="chevron-forward-outline" size={22} color="#C7C7CC" />
                            </View>
                            <Text style={styles.infoText}>{ward || 'Chọn phường/xã'}</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 4, gap: 5 }}>
                            <Text style={styles.label}>Tên đường, Tòa nhà, Số nhà</Text>
                            <Text style={styles.infoText}>{streetDetails}</Text>
                        </View>
                    </View>

                    <SwitchRow
                        text="Đặt làm địa chỉ mặc định"
                        icon="checkmark-circle"
                        value={isEnabled}
                        onValueChange={setIsEnabled}
                    />

                    <View style={styles.btn}>
                        <TouchableOpacity style={Styles.addButton} onPress={handleAddAddress}>
                            <Ionicons name="add" size={22} color="#FFFFFF" />
                            <Text style={Styles.addButtonText}>Lưu địa chỉ</Text>
                        </TouchableOpacity>
                    </View>
                </AddressCard>
            </ScrollView>
        </View>
    );
};


export default AddAddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 12,
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        // ✅ Shadow Android
        elevation: 5,

    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
        textTransform: 'capitalize',
        marginBottom: 10,
    },
    labelValueBox: {
        marginBottom: 5,
        paddingVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 7,
        color: '#000000',
        opacity: 0.5,
        borderTopWidth: StyleSheet.hairlineWidth
    },
    input: {
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#F9F9F9',

    },
    infoText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 4,

    },
    rowWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    touchBox: {
        paddingVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        paddingBottom: 24, // Thêm padding cho các thiết bị có tai thỏ
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E5E5EA',
    },
    successContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 200
    },
    successCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EFF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        borderWidth: 1,
        borderColor: '#088A2D'
    },

    Circletitle: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold'

    }
});

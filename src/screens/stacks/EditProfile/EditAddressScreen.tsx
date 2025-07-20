import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';
import { SwitchRow, SwitchRowProps } from '../Account/Profile'
import { WebView } from 'react-native-webview';
import { styles as Styles } from '../Account/AddressListScreen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchAddress } from '../../../redux/features/addresses/addressesSlice';
import { useFocusEffect } from '@react-navigation/native';


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

const EditAddressScreen = ({ navigation, route }) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [streetDetails, setStreetDetails] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    const [ShowEditadd, setShowEditadd] = useState(false)
    const { addressId, userId } = route.params;
    const [isManuallyUpdated, setIsManuallyUpdated] = useState(false);

    const { loading, error, selectedAddress } = useSelector((state: RootState) => state.address)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(fetchAddress({ _id: userId, addressId }));
        });
        return unsubscribe
    }, [navigation, addressId, userId])

    useEffect(() => {
        if (selectedAddress && !isManuallyUpdated) {
            setFullName(selectedAddress.fullName || '');
            setPhone(selectedAddress.phone || '');
            setCity(selectedAddress.city || '');
            setDistrict(selectedAddress.district || '');
            setWard(selectedAddress.ward || '');
            setStreetDetails(selectedAddress.streetDetails || '');
            setIsEnabled(selectedAddress.isDefault || false);
        }
    }, [selectedAddress, isManuallyUpdated]);
    // useFocusEffect(
    //   useCallback(() => {
    //     if (route.params?.locationData) {
    //       const { city, district, ward, streetDetails } = route.params.locationData;
    //       console.log(" Nhận lại locationData khi quay về:", route.params.locationData);
    //       setCity(city);
    //       setDistrict(district);
    //       setWard(ward);
    //       setStreetDetails(streetDetails);
    //     }
    //   }, [route.params]) // CHỈ phụ thuộc vào `route.params` hoặc không cần dependency
    // );



    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Sửa địa chỉ"
                titleStyle={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    letterSpacing: 1
                }}
            />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <AddressCard title="Thông tin người nhận">
                    <LabelValueBox label='Họ tên' value={fullName} onChangeText={setFullName} />
                    <LabelValueBox label="Số điện thoại" value={phone} onChangeText={setPhone} />

                </AddressCard>
                <AddressCard title="Địa chỉ giao hàng">

                    <View style={styles.labelValueBox}>
                        <Text style={styles.label}>
                            Tỉnh / Thành, Quận / Huyện, Phường / Xã
                        </Text>
                        <TouchableOpacity style={{ marginTop: 4, gap: 8 }} onPress={() => {
                            navigation.navigate('LocationScreen', {
                                currentData: {
                                    city,
                                    district,
                                    ward,
                                    streetDetails,
                                },
                                onSelectLocation: (newLocation: any) => {
                                    setCity(newLocation.city);
                                    setDistrict(newLocation.district);
                                    setWard(newLocation.ward);
                                    setStreetDetails(newLocation.streetDetails);
                                    setIsManuallyUpdated(true); //  Đánh dấu là user đã chỉnh
                                }

                            });
                        }}

                        >

                            <Text style={styles.infoText}>{city}</Text>
                            <View style={styles.rowWithIcon}>
                                <Text style={styles.infoText}>{district}</Text>
                                <Ionicons name="chevron-forward-outline" size={22} color="#C7C7CC" />
                            </View>
                            <Text style={styles.infoText}>{ward}</Text>

                        </TouchableOpacity>
                        <View style={{ marginTop: 4, gap: 5, }}>
                            <Text style={styles.label}>Tên đường, Tòa nhà, Số nhà</Text>
                            <Text style={styles.infoText}>{streetDetails}</Text>
                        </View>

                    </View>
                    <View style={{ height: 300, borderRadius: 10, overflow: 'hidden', marginTop: 10 }}>
                        <WebView
                            source={{ uri: 'https://www.google.com/maps' }}
                            style={{ flex: 1 }}
                        />
                    </View>

                    <SwitchRow
                        text="Đặt làm địa chỉ mặc định"
                        icon="checkmark-circle"
                        value={isEnabled}
                        onValueChange={setIsEnabled}
                    />
                    <View style={styles.btn}>
                        <TouchableOpacity style={Styles.addButton} onPress={() => { }}>
                            <Ionicons name="add" size={22} color="#FFFFFF" />
                            <Text style={Styles.addButtonText}>Lưu địa chỉ</Text>
                        </TouchableOpacity>
                    </View>
                </AddressCard>

            </ScrollView>

        </View>
    );
};

export default EditAddressScreen;

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

        padding: 10,
        paddingBottom: 24, // Thêm padding cho các thiết bị có tai thỏ
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E5E5EA',
    }
});

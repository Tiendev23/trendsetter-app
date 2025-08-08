import { Keyboard, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomButton, LongPressButton } from '@/components';
import { AddressModifyNav, ObjectId, ProvinceLite, ShippingAddress, Ward } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { showErrorToast, showInfoToast } from '@/utils/toast';
import { ProvincePicker, UnderlinedInput, WardPicker } from './components';
import { deleteShippingAddress, resetAddressesState, setSelectedAddress, updateShippingAddress } from '@/redux/features/address/addressesSlice';
import { validateAddressStreet, validateFullName, validatePhoneNumber } from '@/utils/validateForm';
import { getAddress } from './hooks';
import { mapAddressToCode } from '@/services/location.service';
import { saveItem } from '@/services/asyncStorage.service';

type Props = {
    navigation: AddressModifyNav;
    userId: ObjectId;
    address: ShippingAddress;
};

export default function EditAddressContent({ navigation, userId, address }: Props) {
    const { province: provinceLite, ward: wardLite } = useMemo(() =>
        mapAddressToCode({ province: address.province, ward: address.ward }), [address]
    )
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.addresses)
    const [fullName, setFullName] = useState(address.fullName);
    const [phone, setPhone] = useState(address.phone);
    const [province, setProvince] = useState<ProvinceLite | null>(provinceLite);
    const [provinceValue, setProvinceValue] = useState<string | null>(provinceLite.provinceCode);
    const [ward, setWard] = useState<Ward | null>(null);
    const [wardValue, setWardValue] = useState<string | null>(wardLite.wardCode);
    const [street, setStreet] = useState(address.street);
    const [isDefault, setIsDefault] = useState(address.isDefault);

    const updatedAddress = useMemo(() => {
        return getAddress({
            input: { fullName, phone, street },
            province,
            ward,
            isDefault,
        });
    }, [fullName, phone, street, province, ward, isDefault]);

    useEffect(() => {
        if (status === "succeeded" && updatedAddress) {
            if (updatedAddress.isDefault) saveItem("@Address", updatedAddress);
            dispatch(setSelectedAddress(updatedAddress));
            navigation.goBack();
        }
        if (status === "failed") {
            showErrorToast({
                title: `Lỗi ${error?.code}`,
                message: error?.message
            });
            dispatch(resetAddressesState());
        }
    }, [status])


    function handleUpdateAddress() {
        Keyboard.dismiss();
        if (!updatedAddress) {
            showErrorToast({
                title: "Vui lòng nhập đúng thông tin và không bỏ trống"
            });
            return;
        };
        dispatch(updateShippingAddress({
            userId,
            addressId: address._id,
            body: updatedAddress
        }));
    };

    function handleDeleteAddress() {
        Keyboard.dismiss();
        dispatch(deleteShippingAddress({
            userId,
            addressId: address._id
        }));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <UnderlinedInput
                    value={fullName}
                    onChange={setFullName}
                    placeholder='Nhập họ và tên người nhận'
                    maxLength={50}
                    errorTrigger={fullName.length > 0 && !validateFullName(fullName)}
                    errorText='Họ và tên không hợp lệ'
                />

                <UnderlinedInput
                    value={phone}
                    onChange={setPhone}
                    placeholder='Nhập số điện thoại người nhận'
                    maxLength={10}
                    errorTrigger={phone.length == 10 && !validatePhoneNumber(phone)}
                    keyboardType='number-pad'
                    errorText='Số điện thoại không hợp lệ'
                />

                <ProvincePicker
                    onProvPick={(prov) => {
                        if (prov == province) return;
                        setProvince(prov);
                        setWardValue(null);
                        setWard(null);
                    }}
                    valueHook={[provinceValue, setProvinceValue]}
                />

                <WardPicker
                    defaultWard={wardLite}
                    provinceCode={province?.provinceCode ?? null}
                    onWardPick={setWard}
                    valueHook={[wardValue, setWardValue]}
                />

                <UnderlinedInput
                    value={street}
                    onChange={setStreet}
                    placeholder='Nhập số nhà, Tên đường, Toà nhà'
                    maxLength={100}
                    errorTrigger={street.length > 10 && !validateAddressStreet(street)}
                    errorText='Địa chỉ không hợp lệ'
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    gap: 20,
                }}>
                    <Text>
                        Địa chỉ mặc định
                    </Text>
                    <Switch
                        value={isDefault}
                        onValueChange={checked => {
                            setIsDefault(checked);
                        }}
                    />
                </View>

                <View style={styles.buttonWrapper}>
                    <LongPressButton
                        label='Xoá địa chỉ'
                        onPressIn={handleDeleteAddress}
                        onCancelPress={() => showInfoToast({
                            title: "Lưu ý",
                            message: "Nhấn và giữ nút để xoá"
                        })}
                        theme='red-outline'
                    />

                    <CustomButton
                        title='Hoàn thành'
                        onPress={handleUpdateAddress}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingHorizontal: 16,
        rowGap: 24,
    },
    buttonWrapper: {
        marginTop: 20,
        paddingHorizontal: '10%',
        rowGap: 20,
    },
});
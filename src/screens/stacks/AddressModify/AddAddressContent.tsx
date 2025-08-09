import { Keyboard, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomButton } from '@/components';
import { AddressModifyNav, ObjectId, ProvinceLite, Ward } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { showErrorToast } from '@/utils/toast';
import { ProvincePicker, UnderlinedInput, WardPicker } from './components';
import { addShippingAddress, resetAddressesState, setSelectedAddress } from '@/redux/features/address/addressesSlice';
import { validateAddressStreet, validateFullName, validatePhoneNumber } from '@/utils/validateForm';
import { getAddress } from './hooks';
import { saveItem } from '@/services/asyncStorage.service';

type Props = {
    navigation: AddressModifyNav;
    userId: ObjectId;
};

export default function AddAddressContent({ navigation, userId }: Props) {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.addresses)
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [province, setProvince] = useState<ProvinceLite | null>(null);
    const [provinceValue, setProvinceValue] = useState<string | null>(null);
    const [ward, setWard] = useState<Ward | null>(null)
    const [wardValue, setWardValue] = useState<string | null>(null);
    const [street, setStreet] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const newAddress = useMemo(() => {
        return getAddress({
            input: { fullName, phone, street },
            province,
            ward,
            isDefault,
        });
    }, [fullName, phone, street, province, ward, isDefault]);

    useEffect(() => {
        if (status === "succeeded" && newAddress) {
            if (newAddress.isDefault) saveItem("@Address", newAddress);
            dispatch(setSelectedAddress(newAddress));
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


    function handleAddAddress() {
        Keyboard.dismiss();
        if (!newAddress) {
            showErrorToast({
                title: "Vui lòng nhập đúng thông tin và không bỏ trống"
            });
            return;
        };
        dispatch(addShippingAddress({
            userId,
            body: newAddress
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
                    <CustomButton
                        title='Thêm địa chỉ'
                        onPress={handleAddAddress}
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
    },
});
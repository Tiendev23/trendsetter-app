import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { AddressView, OrderItemList, PricingPanel, ProviderView } from './components';
import { CheckoutNav, CartItem, User, BaseTransactionProps, Provider, AddressSelection } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { calculateShippingFee } from '@/services/location.service';
import { getAddressDetail } from '@/utils/formatForm';
import { showErrorToast } from '@/utils/toast';
import { getItem, removeItem } from '@/services/asyncStorage.service';
import { setSelectedAddress } from '@/redux/features/address/addressesSlice';
import { KEY } from '@/constants';

type Props = {
    navigation: CheckoutNav;
    items: CartItem[];
    user: User;
    handleCheckout: (data: BaseTransactionProps, provider: Provider) => void;
}

export default function CheckoutContent({ navigation, items, handleCheckout }: Props) {
    const dispatch = useAppDispatch();
    const address = useAppSelector(state => state.addresses.address);
    useEffect(() => {
        getItem(KEY.ADDR).then((storedAddr) => {
            if (storedAddr) {
                dispatch(setSelectedAddress(storedAddr));
                removeItem(KEY.ADDR);
            }
        })
    }, []);

    const pmtMethod = useAppSelector(state => state.provider.method);
    const shippingFee: number = useMemo(() => {
        return calculateShippingFee(address);
    }, [address]);

    const subtotal: number = items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    const discountAmount: number = -items.reduce((sum, item) => sum + (item.basePrice - item.finalPrice), 0) || 0;

    function handleItemClick(item: CartItem) {
        navigation.navigate("ProductDetail", {
            productId: item.product,
            variantId: item.variant,
        }, { merge: true });
    }

    function handleCheckoutClick() {
        if (!address) {
            showErrorToast({
                title: "Không thể đặt hàng",
                message: "Vui lòng nhập địa chỉ giao hàng trước khi đặt hàng"
            })
            return;
        }
        handleCheckout(
            {
                amount: (subtotal + shippingFee),
                shippingFee: shippingFee,
                recipientName: address.fullName,
                recipientPhone: address.phone,
                shippingAddress: getAddressDetail(address),
            },
            pmtMethod.provider
        )

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.wrapper}>
                    <View style={[styles.contentContainer, styles.wrapper]}>
                        <Text style={styles.contentLabel}>Địa chỉ nhận hàng</Text>
                        <AddressView
                            address={address}
                            openAddressSelector={() => navigation.navigate("SelectAddress")}
                            navToAddAddress={() => navigation.navigate("AddressModify", {})}
                        />
                    </View>

                    <View style={[styles.contentContainer, styles.wrapper]}>
                        <Text style={styles.contentLabel}>Danh sách sản phẩm</Text>
                        <OrderItemList
                            items={items}
                            handleItemClick={handleItemClick}
                        />
                    </View>

                    <View style={[styles.contentContainer, styles.wrapper]}>
                        <Text style={styles.contentLabel}>Phương thức thanh toán</Text>
                        <ProviderView
                            method={pmtMethod}
                            openMethodSelection={() => navigation.navigate("SelectProvider")}
                        />
                    </View>
                </View>
            </ScrollView >

            <PricingPanel
                discountAmount={discountAmount}
                subtotal={subtotal}
                shippingFee={shippingFee}
                handleCheckout={handleCheckoutClick}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
    wrapper: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        gap: 12,
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    contentLabel: {
        fontWeight: '500',
        fontSize: 16,
        color: "#707B81"
    },
})
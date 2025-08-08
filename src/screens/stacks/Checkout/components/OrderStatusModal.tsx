import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../../../components/buttons/CustomButton';
import { BlurView } from 'expo-blur';
import { Status } from '@/types';
import { getItem, removeItem } from '@/services/asyncStorage.service';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedAddress } from '@/redux/features/address/addressesSlice';

const OrderPlaced = () => (
    <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
            <Image
                source={require('@/../assets/images/order_placed.png')}
                style={styles.image}
            />
        </View>

        <Text style={styles.description}>
            Tạo đơn hàng thành công
        </Text>
    </View>
)

const OrderCanceled = () => (
    <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
            <Image
                source={require('@/../assets/images/order_failed.png')}
                style={styles.image}
            />
        </View>

        <Text style={styles.description}>
            Tạo đơn hàng thất bại
        </Text>
    </View>
)

const Content = ({ status }: { status: Status }) => {
    if (status === "succeeded") return <OrderPlaced />

    return <OrderCanceled />
}

type Props = {
    status: Status;
    handleContinueShopping: () => void
};

export default function OrderStatusModal({
    status, handleContinueShopping
}: Props) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            setShouldRender(false); // reset nếu status quay về idle/loading
        } else {
            const timeout = setTimeout(() => {
                setShouldRender(true);
            }, 1000); // Delay 3 giây

            return () => clearTimeout(timeout); // cleanup nếu status thay đổi
        }
    }, [status]);

    if (status === 'idle' || !shouldRender) return null;

    if (status === "loading") return (
        <BlurView intensity={10} tint='systemChromeMaterialDark' style={styles.blurBackground}>
            <ActivityIndicator color="#006340" size={"large"} />
        </BlurView>
    )

    return (
        <BlurView intensity={10} tint='systemChromeMaterialDark' style={styles.blurBackground}>
            <View style={styles.container}>
                <Content status={status} />
                <CustomButton
                    title='Tiếp Tục Mua Sắm'
                    onPress={handleContinueShopping}
                />
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 40,
        paddingHorizontal: 45,
        borderRadius: 20,
        width: '85%',
        gap: 24,
    },
    wrapper: {
        alignItems: 'center',
        gap: 24,
    },
    imageWrapper: {
        width: "70%",
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden"
    },
    image: {
        resizeMode: "contain",
        flex: 1,
        width: "100%",
        height: "100%",
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#2B2B2B',
        fontWeight: '600',
        textAlign: 'center'
    },
    blurBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(26,37,48,0.2)'
    },
});
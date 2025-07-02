import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../buttons/CustomButton';

type Props = {
    status: 'succeeded' | 'failed';
    onPress: () => void;
};

export default function OrderNotification({ status, onPress }: Props) {
    const description = status === 'succeeded' ?
        'Tạo đơn hàng thành công' : `Tạo đơn hàng thất bại\nLiên hệ admin để được hoàn tiền`
    return (
        <View style={styles.container}>
            {
                status === 'succeeded' ?
                    <Image source={require('../../../assets/images/payment_successful.png')} />
                    :
                    <Image source={require('../../../assets/images/order_failed.png')} />
            }
            <Text style={styles.description}>
                {description}
            </Text>
            <CustomButton
                title='Tiếp Tục Mua Sắm'
                onPress={onPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '85%',
        paddingVertical: 40,
        paddingHorizontal: 45,
        gap: 24,
        borderRadius: 20,
    },
    description: {
        fontSize: 20,
        lineHeight: 28,
        color: '#2B2B2B',
        fontWeight: '500'
    },
});
import RatingStars from './RatingStars';
import { IMAGE_NOT_FOUND } from '@/constants';
import { Review } from '@/types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { formatVietnameseDate } from '@/utils/formatForm';

export default function ReviewForm({ review }: { review: Review }) {
    const { user, orderDetail, content, rating, createdAt, updatedAt } = review;

    // fallback nếu user null
    const avatar = user?.avatar || IMAGE_NOT_FOUND;
    const username = user?.username || "Người dùng ẩn danh";

    const { productColor, productSize } = orderDetail;
    const isFixed = createdAt !== updatedAt;
    const dateCreated = formatVietnameseDate(createdAt);

    return (
        <View style={{ gap: 4 }}>
            <View style={styles.row}>
                <Image
                    source={{ uri: avatar }}
                    width={35}
                    height={35}
                    borderRadius={35}
                />
                <View style={styles.column}>
                    <Text>{username}</Text>
                    <RatingStars rating={rating} />
                </View>
            </View>
            <Text>Màu: {productColor} — Size: {productSize}</Text>
            {content.trim().length > 0 && <Text>{content}</Text>}
            <Text style={styles.date}>
                {isFixed
                    ? `${dateCreated} - Đã chỉnh sửa`
                    : dateCreated}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    column: {
        justifyContent: 'space-evenly',
    },
    date: {
        color: "#707B81"
    }
})
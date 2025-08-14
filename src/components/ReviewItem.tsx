import RatingStars from './RatingStars';
import { Review } from '@/types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatVietnameseDate } from '@/utils/formatForm';

type Props = {
    review: Review;
    onClick: () => void;
};
export default function ReviewItem({ review, onClick }: Props) {
    const { user, orderItem, content, rating, createdAt, updatedAt, __v } = review;
    const { avatar, username } = user;
    const { color, size } = orderItem;
    const isFixed = __v !== 0;
    const dateCreated = formatVietnameseDate(createdAt);

    return (
        <TouchableOpacity
            style={{ gap: 4 }}
            onPress={onClick}
        >
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
            <Text>Màu: {color} — Size: {size.size}</Text>
            {content.trim().length > 0 && <Text>{content}</Text>}
            <Text style={styles.date}>
                {dateCreated}{isFixed && " - Đã chỉnh sửa"}
            </Text>
        </TouchableOpacity>
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
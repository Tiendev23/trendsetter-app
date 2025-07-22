import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchReviewsByProductId } from '@/redux/features/product/reviewsSlice';
import { ObjectId } from '@/types';
import { RatingStars, ReviewForm } from '@/components';
import { showSuccessToast } from '@/utils/toast';
import ChevronButton from '@/components/buttons/ChevronButton';

type Props = {
    rating: {
        average: string;
        count: number;
    };
}
export function ReviewHeader({ rating }: Props) {
    return (
        <View style={styles.reviewHeader}>
            <TouchableOpacity>
                <Text style={styles.reviewTitle}>
                    Đánh giá sản phẩm <Text style={styles.subtext}>({rating.count})</Text>
                </Text>
            </TouchableOpacity>
            <View style={styles.reviewScoreWrapper}>
                <Text>{rating.average}</Text>
                <RatingStars rating={Number.parseInt(rating.average || '0')} />
                <ChevronButton direction="forward" size={12} disabled />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    reviewTitle: {
        fontWeight: '500',
        fontSize: 16,
    },
    reviewScoreWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    subtext: {
        color: "#707B81",
        fontSize: 12,
    },
})

export function ReviewsRender({ productId }: { productId: ObjectId }) {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.reviews);

    useEffect(() => {
        dispatch(fetchReviewsByProductId(productId));
    }, [productId]);

    const errorShown = useRef(false);

    useEffect(() => {
        if (status === 'failed' && !errorShown.current) {
            errorShown.current = true;
            showSuccessToast({
                title: "Lỗi hiển thị đánh giá",
                message: error
            });
            console.error('error', error)
        }
    }, [status]);


    return (
        <View>
            {
                status === 'succeeded' &&
                <FlatList
                    data={data?.slice(0, 3)}
                    renderItem={({ item }) => (
                        <ReviewForm review={item} />
                    )}
                    scrollEnabled={false} // Tắt cuộn riêng của FlatList
                    nestedScrollEnabled={true} // Cho phép cuộn bên trong ScrollView
                    contentContainerStyle={{ gap: 10 }}
                />
            }
        </View>
    );
}

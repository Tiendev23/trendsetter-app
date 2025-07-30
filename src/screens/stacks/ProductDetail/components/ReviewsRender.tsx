import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchReviewsByProductId } from '@/redux/features/product/reviewsSlice';
import { ObjectId, Rating } from '@/types';
import { RatingStars, ReviewForm } from '@/components';
import { showErrorToast } from '@/utils/toast';
import ChevronButton from '@/components/buttons/ChevronButton';
import Skeleton from '@/components/loaders/Skeleton';

type HeaderProps = {
    rating: Rating;
    onClick: () => void;
}
export function ReviewHeader({ rating, onClick }: HeaderProps) {
    return (
        <View style={styles.reviewHeader}>
            <View>
                <Text style={styles.reviewTitle}>
                    Đánh giá sản phẩm <Text style={styles.subtext}>({rating.count})</Text>
                </Text>
            </View>
            <TouchableOpacity
                style={styles.reviewScoreWrapper}
                onPress={onClick}
            >
                <Text>{rating.average}</Text>
                <RatingStars rating={Number.parseInt(rating.average || '0')} />
                <ChevronButton direction="forward" size={12} disabled />
            </TouchableOpacity>
        </View>
    )
};

type Props = {
    productId: ObjectId;
    handleOnClick: () => void;
}
export function ReviewsRender({ productId, handleOnClick }: Props) {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.reviews);

    useEffect(() => {
        dispatch(fetchReviewsByProductId(productId));
    }, [productId]);

    if (status === 'loading' || status === 'failed' || !data?.data) {
        if (error) {
            showErrorToast({
                title: `Lỗi hiển thị đánh giá ${error.code}`,
                message: error.message
            });
            dispatch(fetchReviewsByProductId(productId));
        }
        return (
            <View style={{ gap: 4 }}>
                <View style={styles.row}>
                    <View style={styles.avatar}>
                        <Skeleton width={35} height={25} />
                    </View>
                    <Skeleton width={100} height={25} />
                </View>
                <Skeleton width={100} height={25} />
                <Skeleton width={200} height={25} />
                <Skeleton width={50} height={25} />
            </View>
        )
    };

    return (
        <FlatList
            data={data.data.slice(0, 3)}
            renderItem={({ item }) => (
                <ReviewForm review={item} onClick={handleOnClick} />
            )}
            scrollEnabled={false} // Tắt cuộn riêng của FlatList
            nestedScrollEnabled={true} // Cho phép cuộn bên trong ScrollView
            contentContainerStyle={{ gap: 10 }}
        />
    );
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
    blurBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    avatar: {
        borderRadius: 35,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
});
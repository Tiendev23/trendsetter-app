import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchReviewsByProductId } from '@/redux/features/product/reviewsSlice';
import { ObjectId, Rating } from '@/types';
import { RatingStars, ReviewForm } from '@/components';
import { showErrorToast } from '@/utils/toast';
import ChevronButton from '@/components/buttons/ChevronButton';
import Skeleton from '@/components/Loaders/Skeleton';

type HeaderProps = {
    rating: Rating;
    handleOnClick: () => void;
}
export function ReviewHeader({ rating, handleOnClick }: HeaderProps) {
    return (
        <View style={styles.reviewHeader}>
            <View>
                <Text style={styles.reviewTitle}>
                    Đánh giá sản phẩm <Text style={styles.subtext}>({rating.count})</Text>
                </Text>
            </View>
            <TouchableOpacity
                style={styles.reviewScoreWrapper}
                onPress={handleOnClick}
            >
                <Text>{rating.average}</Text>
                <RatingStars rating={Number.parseInt(rating.average || '0')} />
                <ChevronButton direction="forward" size={12} disabled />
            </TouchableOpacity>
        </View>
    )
};

type ContentProps = {
    productId: ObjectId;
    handleOnClick: () => void;
}
export function ReviewsRender({ productId, handleOnClick }: ContentProps) {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.reviews);

    useEffect(() => {
        if (status === 'idle')
            dispatch(fetchReviewsByProductId(productId));
    }, [dispatch, productId, status]);

    if (status === 'loading' || status === 'failed' || !data?.data) {
        if (error) {
            showErrorToast({
                title: `Lỗi hiển thị đánh giá ${error.code}`,
                message: error.message
            });
            dispatch(fetchReviewsByProductId(productId));
        };
        return (
            <View style={{ gap: 4 }}>
                <View style={styles.row}>
                    <View style={styles.avatar}>
                        <Skeleton width={35} height={35} />
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
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
                <ReviewForm review={item} onClick={handleOnClick} />
            )}
            scrollEnabled={false} // Tắt cuộn riêng của FlatList
            nestedScrollEnabled={true} // Cho phép cuộn bên trong ScrollView
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        // initialNumToRender={3}
        // maxToRenderPerBatch={3}
        // windowSize={5}
        // removeClippedSubviews={true}
        />
    );
};

type Props = HeaderProps & ContentProps;

export default function ReviewSection({ rating, productId, handleOnClick }: Props) {
    if (rating.count == 0) return null;
    return (
        <View style={styles.container}>
            <ReviewHeader
                rating={rating}
                handleOnClick={handleOnClick}
            />
            <ReviewsRender
                productId={productId}
                handleOnClick={handleOnClick}
            />
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 16,
    },
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
        borderRadius: 70,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
});
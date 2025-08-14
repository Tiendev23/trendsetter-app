import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ReviewFormItem } from './components';
import { ObjectId, OrderItem, ReviewPayload, RvwWritingNav } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createReview, refreshReviewState } from '@/redux/features/review/reviewSlice';
import { toFormData } from './helper';
import { showErrorToast } from '@/utils/toast';
import { fetchUserOrders } from '@/redux/features/order/ordersSlice';
import { useRequireAuth } from '@/contexts/AuthContext';

type Props = {
    navigation: RvwWritingNav;
    items: OrderItem[];
};

export default function ReviewWritingContent({ navigation, items }: Props) {
    const userId = useRequireAuth()._id;
    const [rvwItems, setRvwItems] = useState(items);
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.review);

    useEffect(() => {
        if (status === 'failed' && error) {
            showErrorToast({
                title: `Lỗi ${error.code}`,
                message: error.message
            });
            dispatch(refreshReviewState());
        }
    }, [status])


    const handleReviewSubmit = (review: ReviewPayload, productId: ObjectId) => {
        setRvwItems(prev => prev.filter(item => item._id !== review.orderItem));
        dispatch(createReview({ productId, body: toFormData(review) }));
        dispatch(fetchUserOrders(userId));
        if (rvwItems.length === 1) navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={rvwItems}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <ReviewFormItem
                        item={item}
                        onSubmit={handleReviewSubmit}
                    />
                )}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 10,
        gap: 10,
    }
});
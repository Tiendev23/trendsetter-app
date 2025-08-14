import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenHeader } from '@/components';
import ReviewWritingContent from './ReviewWritingContent';
import { OrderItem, RvwWritingNav, RvwWritingRoute } from '@/types';

type Props = {
    navigation: RvwWritingNav;
    route: RvwWritingRoute;
};

export default function ReviewWriting({ navigation, route }: Props) {
    const items = route.params.items;

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Đánh giá sản phẩm'
            />

            <ReviewWritingContent
                navigation={navigation}
                items={items}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
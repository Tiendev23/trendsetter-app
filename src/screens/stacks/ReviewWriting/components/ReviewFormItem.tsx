import React from 'react';
import { ObjectId, OrderItem, ReviewPayload } from '@/types';
import { useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ProductInfoView from './ProductInfoView';
import RatingForm from './RatingForm';
import CommentForm from './CommentForm';
import ImagesPickerForm from './ImagesPickerForm';
import { CustomButton, LongPressButton } from '@/components';
import { showInfoToast } from '@/utils/toast';

type Props = {
    item: OrderItem;
    onSubmit: (review: ReviewPayload, productId: ObjectId) => void;
}

export default function ReviewFormItem({ item, onSubmit }: Props) {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const review: ReviewPayload = {
        rating, content, images, orderItem: item._id
    };

    const handlePickImage = async () => {
        if (images.length >= 3) return;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            setImages([...images, result.assets[0].uri]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ProductInfoView item={item} />

                <RatingForm
                    rating={rating}
                    onStarPress={setRating}
                />

                <CommentForm
                    content={content}
                    onChangeText={setContent}
                />

                <ImagesPickerForm
                    images={images}
                    handlePickImage={handlePickImage}
                    handleRemoveImage={(index) => handleRemoveImage(index)}
                />

                <View style={styles.buttonWrapper}>
                    <CustomButton
                        title='Gửi đánh giá'
                        onPress={() => onSubmit(review, item.product)}
                    />
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        rowGap: 10,
    },
    buttonWrapper: {
        marginTop: 20
    },
});
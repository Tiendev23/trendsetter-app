import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type Props = {
    username: string;
    rating: number;
    reviewText: string;
    createdAt: string;
};

export default function ReviewForm({ username, rating, reviewText, createdAt }: Props) {
    const RatingStars = ({ rating }: { rating: number }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {[...Array(Math.round(rating))].map((_, index) => (
                    <Ionicons key={index} name="star" size={16} color="gold" />
                ))}
            </View>
        );
    };
    return (
        <View style={{ gap: 4 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{

                }}>{username}</Text>
                <RatingStars rating={rating} />
            </View>
            <Text style={{

            }}>
                {reviewText}
            </Text>
            <Text style={{
                color: '#707B81'
            }}>
                {createdAt}
            </Text>
        </View>
    );
}

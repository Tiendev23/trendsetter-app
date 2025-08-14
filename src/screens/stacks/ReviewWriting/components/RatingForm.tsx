import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    rating: number;
    onStarPress: (star: number) => void;
};

export default function RatingForm({ rating, onStarPress }: Props) {
    return (
        <View style={styles.ratingRow}>
            <Text style={styles.label}>Đánh giá:</Text>
            <View style={styles.starWrapper}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                        key={star}
                        onPress={() => onStarPress(star)}
                    >
                        <Ionicons
                            name={star <= rating ? 'star' : 'star-outline'}
                            size={40}
                            color="gold"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
    },
    label: {
        fontWeight: '600',
    },
    starWrapper: {
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'space-evenly',
        width: '100%',
        flexShrink: 1,
    },
});
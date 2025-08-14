import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ObjectId, User } from '@/types';

type Props = {
    user: User | null;
    isLiked: boolean;
    handleToggleLike: () => void;
};

export default function FavoriteButton({ user, isLiked, handleToggleLike }: Props) {
    if (!user) return null;
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
            ]}
            onPress={(e) => {
                e.stopPropagation();
                handleToggleLike();
            }}
        >
            <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={26}
                color={isLiked ? '#ff0000' : '#006340'}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        top: '100%',
        bottom: '50%',
        end: 10,
        transform: [{ translateY: -25 }],
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
    },
    pressed: {
        backgroundColor: '#00634020',
    },
});
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    direction: 'back' | 'forward';
    onPress: () => void;
};

export default function CustomDirectionButton({ direction, onPress }: Props) {
    const name = 'chevron-' + direction
    return (
        <TouchableOpacity
            style={{
                padding: 10,
            }}
            onPress={onPress}
        >
            <Ionicons
                name={name as any}
                size={24}
                color="#2B2B2B"
            />
        </TouchableOpacity>
    );
}

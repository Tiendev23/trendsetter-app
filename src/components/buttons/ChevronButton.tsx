import React from 'react';
import { TouchableOpacity, Text, StyleSheet, OpaqueColorValue } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    direction?: 'back' | 'forward';
    size?: number;
    color?: string | OpaqueColorValue;
    onPress?: () => void;
    disabled?: boolean;
};

export default function CustomDirectionButton({ direction, onPress, size, color, disabled }: Props) {
    const name = 'chevron-' + direction
    return (
        <TouchableOpacity
            style={{
                padding: 10,
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Ionicons
                name={name as any}
                size={size || 24}
                color={color || "#2B2B2B"}
            />
        </TouchableOpacity>
    );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import ChevronButton from './button/ChevronButton';

type Props = {
    title: string;
    label: string;
    onPress: () => void;
};

export default function AccountTabSection({ title, label, onPress }: Props) {

    const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
        profile: 'person-outline',
        mycart: 'cart-outline',
        favorite: 'heart-outline',
        orders: 'receipt-outline',
        wallet: 'wallet-outline',
        settings: 'settings-outline',
        signout: 'log-out-outline',
    };

    const getIconName = (label: string): keyof typeof Ionicons.glyphMap => {
        const key = label.replace(/\s+/g, '').toLowerCase();
        return iconMap[key] || 'person-outline';
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.wrapper}>
                <Ionicons
                    name={getIconName(label)}
                    size={22}
                    color="#2B2B2B"
                />
                <Text style={styles.title}>{title}</Text>
            </View>
            {
                label === 'Sign Out' ? null : (
                    <ChevronButton
                        direction="forward"
                        onPress={onPress}
                    />
                )
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    title: {
        fontSize: 16,
        lineHeight: 20,
        color: '#2B2B2B',
        fontWeight: '500',
    },
});

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, ImageSourcePropType } from 'react-native';
import CustomDirectionButton from './DirectionButton';

type Props = {
    title: string;
    label: string;
    onPress: () => void;
};

export default function AccountTabSection({ title, label, onPress }: Props) {

    const iconMap: Record<string, ImageSourcePropType> = {
        profile: require('../../assets/icons/profile_icon.png'),
        mycart: require('../../assets/icons/cart_icon.png'),
        favorite: require('../../assets/icons/favorite_icon.png'),
        orders: require('../../assets/icons/orders_icon.png'),
        wallet: require('../../assets/icons/wallet_icon.png'),
        settings: require('../../assets/icons/setting_icon.png'),
        signout: require('../../assets/icons/signout_icon.png'),
    };

    const getImageSource = (name: string): ImageSourcePropType => {
        const formattedName = name.replace(/\s+/g, '').toLowerCase();
        return iconMap[formattedName] || require('../../assets/icons/profile_icon.png');
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.wrapper}>
                <Image source={getImageSource(label)} style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
            </View>
            {
                label === 'Sign Out' ? null :
                    <CustomDirectionButton
                        direction='forward'
                        onPress={onPress}
                    />
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
    icon: {
        tintColor: '#2B2B2B',
    },
    title: {
        fontWeight: 'medium',
        fontSize: 16,
        lineHeight: 20,
        color: '#2B2B2B',
    },

})
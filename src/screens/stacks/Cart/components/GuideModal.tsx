import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components';

type Props = {
    visible: boolean;
    handleCloseGuide: () => void;
};

export default function GuideModal({ visible, handleCloseGuide }: Props) {
    if (!visible) return null;
    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Hướng dẫn'
                leftButton={<View />}
                rightButton={
                    <Pressable
                        onPress={handleCloseGuide}
                        style={styles.button}
                    >
                        <Ionicons name='close-circle' size={30} color={'red'} />
                    </Pressable>
                }
            />
            <View style={{ flex: 1 }}>
                <Image
                    source={require('@/../assets/images/cart_guide.png')}
                    style={styles.image}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFF',
        flexShrink: 1,
        paddingBottom: 20,
    },
    headerContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 22,
        paddingHorizontal: 18,
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 20,
        color: '#006340',
        textAlign: 'center',
        textTransform: 'capitalize',
        letterSpacing: 1
    },
    button: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});
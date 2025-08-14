import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    images: string[];
    handlePickImage: () => void;
    handleRemoveImage: (index: number) => void
};

export default function ImagesPickerForm({
    images, handlePickImage, handleRemoveImage
}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Hình ảnh (tối đa 3):</Text>
            <View style={styles.imageRow}>
                {images.map((uri, index) => (
                    <View key={index} style={styles.imageBox}>
                        <Image source={{ uri }} style={styles.uploadedImage} />
                        <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => handleRemoveImage(index)}
                        >
                            <Ionicons name="close-circle" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
                {images.length < 3 && (
                    <TouchableOpacity style={styles.addImageBox} onPress={handlePickImage}>
                        <Ionicons name="camera" size={28} color="#666" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        rowGap: 12,
    },
    label: {
        fontWeight: '600',
    },
    imageRow: {
        flexDirection: 'row',
        gap: 12,
    },
    imageBox: {
        position: 'relative',
    },
    uploadedImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    removeBtn: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    addImageBox: {
        width: 70,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
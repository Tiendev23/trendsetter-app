import React, { useRef, useState } from 'react';
import { FlatList, View, Image, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { IMAGE_NOT_FOUND } from '../../../constants';


type Props = {
    images: string[];
};

const { width } = Dimensions.get('window');
export default function ImageSlider({ images }: Props) {
    const listRef = useRef<FlatList<any>>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        if (index >= 0 && index < images.length) {
            listRef.current?.scrollToIndex({ index, animated: true });
            setCurrentIndex(index);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={listRef}
                data={images}
                keyExtractor={(item) => item}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item || IMAGE_NOT_FOUND }}
                        style={styles.image}
                    />
                )}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(newIndex);
                }}
            />

            <View style={styles.container}>
                <TouchableOpacity onPress={() => scrollToIndex(currentIndex - 1)}>
                    <Text style={[styles.directButton, { textAlign: 'left' }]}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToIndex(currentIndex + 1)}>
                    <Text style={[styles.directButton, { textAlign: 'right' }]}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    image: {
        width: width,
        resizeMode: 'contain',
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    directButton: {
        height: '100%',
        width: 100,
        textAlignVertical: 'center',
        paddingHorizontal: 10,
    }
})
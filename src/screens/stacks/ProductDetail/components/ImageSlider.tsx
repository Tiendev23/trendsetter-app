import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Image, Dimensions, StyleSheet, Pressable } from 'react-native';
import { IMAGE_NOT_FOUND } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';


type Props = {
    images: string[];
};

const { width } = Dimensions.get('window');
export default function ImageSlider({ images }: Props) {
    const listRef = useRef<FlatList<any>>(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (index + 1) % images.length;
            listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setIndex(nextIndex);
        }, 5000);
        return () => clearInterval(interval);
    }, [index]);

    const scrollTo = (targetIndex: number) => {
        listRef.current?.scrollToIndex({ index: targetIndex, animated: true });
        setIndex(targetIndex);
    };

    const ArrowButton = ({ direction, onPress }: { direction: 'left' | 'right', onPress: () => void }) => {
        const isLeft = direction === 'left';
        return (
            <Pressable onPress={onPress}>
                <LinearGradient
                    colors={["rgba(0, 0, 0, 0.75)", "rgba(0, 0, 0, 0.35)", "rgba(255, 255, 255, 0)"]}
                    start={{ x: isLeft ? 0 : 1, y: 0 }}
                    end={{ x: isLeft ? 1 : 0, y: 0 }}
                    style={styles.directButton}
                >
                    <SimpleLineIcons name={isLeft ? "arrow-left" : "arrow-right"} size={70} color="white" />
                </LinearGradient>
            </Pressable>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={listRef}
                data={images}
                keyExtractor={(item, idx) => idx.toString()}
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
                    setIndex(newIndex);
                }}
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
            />

            <View style={styles.buttonWrapper}>
                <ArrowButton
                    direction="left"
                    onPress={() => scrollTo(index === 0 ? images.length - 1 : index - 1)}
                />
                <ArrowButton
                    direction="right"
                    onPress={() => scrollTo((index + 1) % images.length)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    image: {
        width: width,
        resizeMode: 'contain',
    },
    buttonWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    directButton: {
        height: '100%',
        width: 75,
        justifyContent: 'center'
    },
})
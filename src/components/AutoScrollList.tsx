import React, { useRef, useEffect, useState } from 'react';
import { FlatList, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const items = ['🍎', '🍊', '🍌', '🍇', '🥭'];

const AutoScrollList = () => {
    const listRef = useRef<FlatList>(null); // giữ ref tới FlatList
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (index + 1) % items.length;
            listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [index]);

    const renderItem = ({ item }: { item: string }) => (
        <View
            style={{
                width,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f2f2f2',
            }}
        >
            <Text style={{ fontSize: 48 }}>{item}</Text>
        </View>
    );

    return (
        <FlatList
            ref={listRef} // gắn ref
            data={[...items]}
            inverted
            renderItem={renderItem}
            keyExtractor={(item, idx) => idx.toString()}
            horizontal
            pagingEnabled
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default AutoScrollList;
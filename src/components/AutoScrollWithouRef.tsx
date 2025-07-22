import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    Text,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
// const items = ['🍎', '🍊', '🍌', '🍇', '🥭'];
const items = ['🥭', '🍇', '🍌', '🍊', '🍎'];
const reversedItems = [...items].reverse();
const scrollOrder = [0, 4, 3, 2, 1];
const AutoScrollWithoutRef = () => {
    // const [index, setIndex] = useState(0);
    const [index, setIndex] = useState(reversedItems.length - 1);
    // const scrollX = useRef(new Animated.Value(0)).current;
    const scrollX = useRef(new Animated.Value(index * -width)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('scrollX', scrollX);
            // const nextIndex = items.length - (index + 1) ;
            // const nextIndex = (index + 1) % scrollOrder.length;
            // const targetIndex = scrollOrder[nextIndex];
            const nextIndex = index === 0 ? reversedItems.length - 1 : index - 1;

            Animated.timing(scrollX, {
                // toValue: nextIndex * -width,
                // toValue: targetIndex * -width,
                toValue: nextIndex * -width,
                duration: 500,
                useNativeDriver: true,
            }).start();
            setIndex(nextIndex);
        }, 3000);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <ScrollView
            horizontal
            pagingEnabled
            scrollEnabled={false} // tắt thao tác tay
            // showsHorizontalScrollIndicator={true}
            style={{ flex: 1 }}
        // contentOffset={{ x: scrollX, y: 0 }} // cập nhật vị trí cuộn
        >
            <Animated.View style={{
                flexDirection: 'row',
                // transform: [{ translateX: Animated.multiply(scrollX, -1) }]
                transform: [{ translateX: scrollX }]
            }}>
                {items.map((item, i) => (
                    <View
                        key={i}
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
                ))}
            </Animated.View>

        </ScrollView>
    );
};

export default AutoScrollWithoutRef;
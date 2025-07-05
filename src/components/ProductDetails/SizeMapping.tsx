import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useStateTuple } from '../../types';

type StateHooks = {
    selectedSize: useStateTuple<string | null>;
}
type Props = {
    sizes: string[];
    state: StateHooks;
};

export default function SizeMapping({ sizes, state }: Props) {
    const [selectedSize, setSelectedSize] = state.selectedSize;

    return (
        <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
            {
                sizes.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setSelectedSize(selectedSize === item ? null : item);
                        }}
                        style={[styles.sizeButton, {
                            backgroundColor:
                                selectedSize === item ? '#006340' : '#F8F9FA',
                        }]}
                    >
                        <Text style={{
                            color: selectedSize === item ? '#FFFFFF' : '#707B81',
                        }}>{item}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap'
    },
    sizeButton: {
        borderRadius: 100,
        height: 45,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
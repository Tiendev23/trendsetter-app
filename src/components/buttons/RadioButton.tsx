import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type Props = {
    isSelected: boolean;
};

export default function RadioButton({ isSelected }: Props) {
    return (
        <View style={styles.buttonWrapper}>
            <View style={[
                styles.solid,
                isSelected ? styles.selected : styles.unselected
            ]} />
        </View >
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        width: 20,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#006340',
        borderRadius: '100%',
        padding: 2,
        marginEnd: 10
    },
    solid: {
        flex: 1,
        borderRadius: '100%',

    },
    selected: {
        backgroundColor: '#006340'
    },
    unselected: {
        backgroundColor: 'white'
    },
});

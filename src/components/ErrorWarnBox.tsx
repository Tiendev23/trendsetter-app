import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type Props = {
    content: string;
};

export default function ErrorWarnBox({ content }: Props) {
    return (
        <View style={styles.container}>
            {
                content &&
                <View style={styles.wrapper}>
                    <Text style={styles.content}>{content}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 54,
    },
    wrapper: {
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#eb6566',
        backgroundColor: '#fef2f2',
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'center',
    },
    content: {
        textAlign: 'center',
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        color: '#6A6A6A',
    }
});

import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

type Props = {
    content: string;
    onChangeText: (text: string) => void;
};

export default function CommentForm({ content, onChangeText }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nhận xét:</Text>
            <TextInput
                style={styles.textInput}
                multiline
                maxLength={200}
                placeholder="Viết nhận xét của bạn..."
                value={content}
                onChangeText={onChangeText}
            />
            <Text style={styles.charCount}>{content.length}/200 ký tự</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    charCount: {
        textAlign: 'right',
        color: '#999',
        marginTop: 4,
    },
});
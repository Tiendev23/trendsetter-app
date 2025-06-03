import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    type?: 'text' | 'password';
    secureTextEntry?: boolean;
};

export default function CustomInput({ placeholder, value, onChangeText, type = 'text' }: Props) {
    const [isSecure, setSecure] = useState(true)
    const [name, setName] = useState('eye-off-outline')

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={'#A0A0A0'}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={type === 'password' && isSecure}
                autoCapitalize="none"
            />
            {
                type === 'password' &&
                <Ionicons name={name as any} size={24} color="#A0A0A0"
                    style={styles.secureIcon}
                    onPress={() => {
                        setSecure(!isSecure)
                        setName(isSecure ? 'eye' : 'eye-off-outline');
                    }}
                />
            }
        </View >
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 15,
        paddingLeft: 14,
        paddingRight: 40,
        paddingVertical: 16,
        backgroundColor: '#F7F7F9',
    },
    secureIcon: {
        position: 'absolute',
        right: 14,
        height: '100%',
        verticalAlign: 'middle',
        paddingHorizontal: 4,

    }
});

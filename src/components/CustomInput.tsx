import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    type?: 'text' | 'password';
    infoText?: string;
};

export default function CustomInput({ placeholder, value, onChangeText, type = 'text', infoText }: Props) {
    const [isSecure, setSecure] = useState(true);
    const [name, setName] = useState('eye-off-outline');
    const [isFocused, setFocused] = useState(false);

    return (
        <View>
            <View>
                <TextInput
                    style={[styles.input, type === 'password' && { paddingRight: 60 }]}
                    placeholder={placeholder}
                    placeholderTextColor={'#A0A0A0'}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={type === 'password' && isSecure}
                    autoCapitalize="none"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
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
            {
                isFocused && infoText &&
                <Text style={styles.infoText}>
                    {infoText}
                </Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 15,
        paddingHorizontal: 14,
        paddingVertical: 16,
        backgroundColor: '#F7F7F9',
    },
    secureIcon: {
        position: 'absolute',
        right: 14,
        height: '100%',
        verticalAlign: 'middle',
        paddingHorizontal: 4,
    },
    infoText: {
        marginTop: 6,
        textAlign: 'center',
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        color: '#A0A0A0'
    },
});

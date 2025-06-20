import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CustomInput from './CustomInput';
import { validateEmail, validatePhoneNumber } from '../utils/validateForm';

type Props = {
    type: 'mail' | 'call';
    value: string;
    onChangeText: (text: string) => void;
};

export default function InfoContainer({ type, value, onChangeText: setValue }: Props) {
    const [editable, setEditable] = useState(false);
    const [text, setText] = useState(value)
    const [errorMess, setErrorMess] = useState('');

    useEffect(() => {
        if (type === 'mail') {
            if (!validateEmail(text)) {
                setErrorMess('Email không đúng định dạng');
                setText(value);
            }
            else setValue(text)
        } else {
            if (!validatePhoneNumber(text)) {
                setErrorMess('Số điện thoại không đúng định dạng');
                setText(value);
            }
            else setValue(text)
        }

        setTimeout(() => {
            setErrorMess('')
        }, 5000);
    }, [editable]);

    return (
        <View>
            <View style={styles.container}>
                <View style={[styles.container, { gap: 10 }]}>
                    <View style={styles.icon}>
                        <Ionicons name={type.concat("-outline") as any} size={30} color="#707B81" />
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.label}>
                            {type === 'mail' ? 'Email' : 'Số điện thoại'}
                        </Text>
                        <TextInput
                            style={[styles.content, editable ? styles.inputEditable : {}]}
                            numberOfLines={1}
                            placeholder={text}
                            placeholderTextColor={'#A0A0A0'}
                            value={text}
                            onChangeText={setText}
                            editable={editable}
                            inputMode={type === 'mail' ? 'email' : 'numeric'}
                        />
                    </View>
                </View>
                {
                    !(type === 'mail') &&
                    <View>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => {
                                setEditable(!editable);
                            }}
                        >
                            <AntDesign name="edit" size={30} color="#707B81" />
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <Text style={styles.error}>{errorMess}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    icon: {
        padding: 12,
    },
    contentContainer: {
        flex: 1,
        gap: 2
    },
    label: {
        color: '#707B81',
        fontSize: 16,
    },
    content: {
        flexShrink: 1,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
    },
    inputEditable: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    error: {
        textAlign: 'center',
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        color: '#eb6566',
        marginVertical: 6,
    }
});
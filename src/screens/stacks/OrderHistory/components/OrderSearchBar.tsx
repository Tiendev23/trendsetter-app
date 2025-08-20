import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomInput from '@/components/CustomInput';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    visible: boolean;
    filterValue: string;
    setFilterValue: (text: string) => void;
};

export default function OrderSearchBar({
    visible, filterValue, setFilterValue
}: Props) {
    return (
        <View
            style={[styles.searchBarWrapper, { height: visible ? 60 : 0 }]}
        >
            <CustomInput
                value={filterValue}
                placeholder='Nhập mã đơn, giá tiền hoặc tên hàng'
                onChangeText={setFilterValue}
            />
            <Pressable
                onPress={() => setFilterValue("")}
                style={styles.clearButton}
            >
                <Ionicons
                    name='close'
                    color={'gray'}
                    size={24}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarWrapper: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        marginVertical: 'auto'
    },
    clearButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 5,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
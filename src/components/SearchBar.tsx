import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
    return (
        <View >
            <View style={styles.searchSection}>
                <Ionicons name="search" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm..."
                    placeholderTextColor="#888"
                />
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    searchSection: {
        width: 400,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: "black",
        fontFamily: 'bold'
    },
});
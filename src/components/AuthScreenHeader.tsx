import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import CustomDirectionButton from './CustomDirectionButton';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreenHeader() {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.titleWrapper}>
                <View style={styles.backButtonWrapper}>
                    <CustomDirectionButton direction="back" onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.titleText}>Trendsetter</Text>
            </View>
            <View style={styles.separatorLine} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        gap: 15,
        paddingVertical: 20,
    },
    titleWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    backButtonWrapper: {
        position: 'absolute',
        left: 18,
    },
    titleText: {
        fontFamily: 'Raleway',
        fontWeight: 'bold',
        fontSize: 32,
        color: '#006340',
    },
    separatorLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#D0D3D5',
    },
});

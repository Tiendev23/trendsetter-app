import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import CustomDirectionButton from './buttons/ChevronButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/NavigationTypes';

export default function AuthScreenHeader() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.titleWrapper}>
                <View style={styles.backButtonWrapper}>
                    <CustomDirectionButton direction="back" onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        } else {
                            navigation.navigate('Tabs');
                        }
                    }} />
                </View>
                <Text style={styles.titleText}>Trendsetter</Text>
            </View>
            <View style={styles.separatorLine} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 10,
    },
    titleWrapper: {
        position: 'relative',
        alignItems: 'center',
        paddingVertical: 15,
    },
    backButtonWrapper: {
        position: 'absolute',
        left: 18,
        top: '50%',
        transform: [{ translateY: -7 }],
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

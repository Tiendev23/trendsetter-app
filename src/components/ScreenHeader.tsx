import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import CustomDirectionButton from './buttons/ChevronButton';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
    rightButton?: React.JSX.Element;
};

export default function ScreenHeader({ title, rightButton }: Props) {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    {title}
                </Text>
            </View>
            <View style={styles.headerActions}>
                <CustomDirectionButton
                    direction="back"
                    onPress={() => navigation.goBack()}
                />
                {rightButton}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 22,
        paddingHorizontal: 18,
    },
    headerTitle: {
        fontWeight: '600',
        fontStyle: 'italic',
        fontSize: 20,
        color: '#006340',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingHorizontal: 18,
    },
});

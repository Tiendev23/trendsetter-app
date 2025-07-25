import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, TextStyle } from 'react-native';
import ChevronButton from './buttons/ChevronButton';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    rightButton?: React.JSX.Element;
    leftButton?: React.JSX.Element;
};

export default function ScreenHeader({ title, titleStyle, rightButton, leftButton }: Props) {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerTitle, titleStyle]}>
                    {title}
                </Text>
            </View>
            <View style={styles.headerActions}>
                {
                    leftButton ??
                    <ChevronButton
                        direction="back"
                        onPress={() => navigation.goBack()}
                    />
                }
                {rightButton}
            </View>

            <View style={styles.separatorLine} />
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
        fontSize: 20,
        color: '#006340',
        textAlign: 'center',
        textTransform: 'capitalize',
        letterSpacing: 1
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
    separatorLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#D0D3D5',
    },
});

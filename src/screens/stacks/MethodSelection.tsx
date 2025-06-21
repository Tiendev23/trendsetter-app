import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ScreenHeader from '../../components/ScreenHeader';
import { MethodSelectionNav, MethodSelectionRoute } from '../../navigation/NavigationTypes';
import { FlatList } from 'react-native-gesture-handler';
import PaymentMethod from '../../components/listItems/PaymentMethod';
import { Payment } from '../../types';
import CustomButton from '../../components/buttons/CustomButton';

export default function MethodSelection({ navigation, route }: { navigation: MethodSelectionNav, route: MethodSelectionRoute }) {

    const data = route.params.paymentMethods;
    const [selectedMethod, setSelectedMethod] = useState<Payment>(route.params.method);

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Phương Thức Thanh Toán'
            />

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <PaymentMethod
                        method={item}
                        selectedMethod={selectedMethod}
                        setSelected={setSelectedMethod}
                    />
                )}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={styles.line} />}
            />

            <View style={{ padding: 20, paddingBottom: 30 }}>
                <CustomButton
                    title='Chọn'
                    onPress={() => {
                        route.params.setMethod(selectedMethod);
                        navigation.goBack();
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
    contentContainer: {
        marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF'
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#D5D5D5'
    },
});
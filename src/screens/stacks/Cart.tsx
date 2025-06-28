import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { CartNav } from '../../navigation/NavigationTypes';
import CustomDirectionButton from '../../components/buttons/ChevronButton';
import Skeleton from '../../components/loaders/Skeleton';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../../components/listItems/CartItem';
import { formatCurrency } from '../../utils/formatForm';
import CustomButton from '../../components/buttons/CustomButton';
import { AuthContext } from '../../contexts/AuthContext';

export default function Cart({ navigation }: { navigation: CartNav }) {
    const cart = useContext(CartContext);
    const { user } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/* header */}
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>
                        Giỏ Hàng
                    </Text>
                </View>
                <View style={styles.headerActions}>
                    <CustomDirectionButton
                        direction="back"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={cart.items}
                    // extraData={cartItems}
                    renderItem={({ item }) => <CartItem item={item} />}
                    contentContainerStyle={{ gap: 16, paddingVertical: 16 }}
                />
            </View>

            {
                cart.items.length > 0 &&
                <View style={styles.pricingPanel}>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.label}>Tổng cộng</Text>
                        {
                            cart.status === 'succeeded' ?
                                <Text style={[styles.label, styles.price]}>{formatCurrency(cart.getSubtotal())}</Text>
                                : <Skeleton width={100} height={20} />
                        }
                    </View>
                    <CustomButton
                        title='Mua Hàng'
                        onPress={() => {
                            user ?
                                navigation.navigate('Checkout')
                                :
                                navigation.navigate('Login')
                        }}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
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

    pricingPanel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        gap: 20,
        paddingBottom: 30
    },

    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    price: {
        color: '#006340'
    },

})
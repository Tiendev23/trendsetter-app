import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const Cart = ({ navigation }) => {
    const data = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
        { id: 4, name: 'Product 4', price: 40 },
        { id: 5, name: 'Product 5', price: 50 },
    ];

    const [editing, setEditing] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.header_btn} onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.header_title}>My Cart</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.listcart}>
                    <Image
                        source={require('../../../assets/images/banner-quang-cao-giay-1.png')
                        } style={styles.image}
                        resizeMode='stretch'
                    />
                    <Text style={styles.listcart_update} onPress={() => setEditing(!editing)}>Sửa</Text>

                    <View style={styles.listcart_content}>
                        <Text style={styles.txtname} numberOfLines={1}
                            ellipsizeMode="tail"
                        >Xin chào nàng thiếu nữ</Text>
                        <Text style={styles.txtprice}>800,000 VND</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30, width: 260 }}>
                            <View style={styles.shipTag}>
                                <Ionicons name="rocket-outline" size={14} color="#000" />
                                <Text style={styles.shipText}>Xpress Ship</Text>
                            </View>
                            <View style={styles.listcart_content_btn}>
                                <TouchableOpacity>
                                    <Ionicons name="remove" size={16} color="black" />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 16 }}>16</Text>
                                <TouchableOpacity>
                                    <Ionicons name="add" size={16} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    {editing && (
                        <View style={styles.editPanel}>
                            <TouchableOpacity>
                                <Text style={styles.editText}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.editText}>Sản phẩm liên quan</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
                    )}
                />
                
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', // căn giữa theo chiều ngang
        position: 'relative',
    },
    header_btn: {
        position: 'absolute',
        left: 0
    },
    header_title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    listcart: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(213, 216, 215, 0.37)',
        height: 100,
        position: 'relative',
        borderRadius: 10,

    },
    image: {
        width: 87,
        height: 85
    },
    listcart_content: {
        boxSizing: 'border-box',
        position: 'absolute',
        top: 8,
        left: 110


    },
    txtname: {
        width: 230,
        fontSize: 19,
        fontWeight: '500',
        color: '#333',
        letterSpacing: 1,
        lineHeight: 24,

    },
    txtprice: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginTop: 5
    },
    listcart_update: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    shipTag: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#006340',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 5
    },
    shipText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#006340'

    },
    listcart_content_btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 18,
        width: 60


    },
    editPanel: {
        position: 'absolute',
        right: 0,
        top: 40,
        width: 160,
        height: 70,
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'space-around',
        elevation: 3, // bóng (Android)
        shadowColor: '#000', // bóng (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    editText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        margin: 4
    },

})
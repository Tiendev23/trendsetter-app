import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function Account() {
    const [user, setUser] = useState({
        name: 'Nguyen VAN a',
        email: 'example@example.com'
    })
    return (
        <View style={styles.container}>
            <Text style={styles.tabTitle}>
                Account
            </Text>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>
                    {user.name.toLowerCase()}
                </Text>
                <Text style={styles.userEmail}>
                    {user.email}
                </Text>
            </View>
            <Text></Text>
            <ScrollView>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/profile_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={20}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Profile</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.itemDescription}>Shipping, Email, Passworld, Shoe Size</Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../assets/icons/open_icon.png')}
                                style={styles.openIcon}
                                width={28} height={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/buying_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={20}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Buying</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.itemDescription}>
                                    Acitive Bids, In-Progress, Orders
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../assets/icons/open_icon.png')}
                                style={styles.openIcon}
                                width={28} height={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/selling_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={13}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Selling</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.itemDescription}>
                                    Active Asks, Sales, Seller Profile
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../assets/icons/open_icon.png')}
                                style={styles.openIcon}
                                width={28} height={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/favorite_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={17}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Favorites</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.itemDescription}>
                                    Items and lists you’ve saved
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../assets/icons/open_icon.png')}
                                style={styles.openIcon}
                                width={28} height={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/portfolio_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={20}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Portfolio</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.itemDescription}>
                                    See the value of your items
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../assets/icons/open_icon.png')}
                                style={styles.openIcon}
                                width={28} height={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/wallet_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={14}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Wallet</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.itemDescription}>
                                    Payments, Payouts, Gift Cards, Credits
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../assets/icons/open_icon.png')}
                                style={styles.openIcon}
                                width={28} height={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/setting_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={20}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Settings</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.itemDescription}>
                                    Security and Notifications
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../assets/icons/open_icon.png')}
                                style={styles.openIcon}
                                width={28} height={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/currency_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={20}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Currency: ₫ VND</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.itemContainer}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/signout_icon.png')}
                                    style={styles.itemIcon}
                                    width={20} height={20}
                                />
                            </View>
                            <View>
                                <Text style={styles.itemTitle}>Sign Out</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 20,
        letterSpacing: 0.25,
        color: '#000000',
        paddingVertical: 16,
        textAlign: 'center'
    },
    userInfo: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        gap: 6,
        backgroundColor: '#EFF9EE'
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 20,
        color: '#000000',
        textTransform: 'capitalize'
    },
    userEmail: {
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: 0.5,
        color: '#000000',
        textTransform: 'lowercase',
    },
    menu: {
        flexDirection: 'column',
        gap: 1,
        backgroundColor: '#E1E1E1'
    },
    section: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingLeft: 20,
        paddingRight: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20',

    },
    itemIcon: {
        tintColor: '#606060'
    },
    itemTitle: {
        fontSize: 16,
        lineHeight: 16,
        color: '#000000',
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 14,
        color: '#606060',
        maxWidth: 350
    },
    openIcon: {
        tintColor: '#212529',
    },

})
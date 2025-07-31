import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BannerItem } from '../../navigation/NavigationTypes';



const Menubar: React.FC<BannerItem> = ({ navigation, brands }) => {
    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#111' }]}
                onPress={() => {

                    navigation.navigate('ProductlistScreen', { brandId: item })
                }}>
                <ImageBackground
                    source={require('../../../assets/images/biti_hunter.png')} // Ảnh nền bên ngoài
                    style={[StyleSheet.absoluteFill, { opacity: 0.7 }]}
                    resizeMode='cover'
                />
                <MaskedView
                    style={{ flex: 1 }}
                    maskElement={
                        <View style={styles.maskedView}>
                            <Text style={styles.maskedText}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                ellipsizeMode="tail"
                            >{item.name}</Text>
                        </View>
                    }
                >
                    <ImageBackground
                        source={require('../../../assets/images/nenchu.jpg')} // Ảnh bên trong vùng chữ
                        style={[styles.imageBackground, { opacity: 0.7 }]} // giảm sáng ảnh chữ
                        imageStyle={styles.imageStyle}
                    />
                </MaskedView>
            </TouchableOpacity>

        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={brands}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                contentContainerStyle={{ paddingHorizontal: 10 }}

            />
        </View>
    );
};

export default Menubar;

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        width: 230,
        height: 80,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 0.1,

    },
    maskedView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,

    },
    maskedText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',

    },
    imageBackground: {
        flex: 1,
    },
    imageStyle: {
        resizeMode: 'cover',
    },

});

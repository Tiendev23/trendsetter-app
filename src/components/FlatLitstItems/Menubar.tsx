import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../redux/features/product/productsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { DataContext } from '../../contexts/DataContext';
import MaskedView from '@react-native-masked-view/masked-view';
import eventBus from '../../utils/Evenbus';



const Menubar = ({navigation}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { brands, brandLoading, error } = useSelector((state: RootState) => state.products);
    const { selectedCategory, setSelectedCategory } = useContext(DataContext);

    useEffect(() => {
        dispatch(getBrand());
    }, [dispatch]);

    // Su kien refeshing
    useEffect(() => {
        const listener = () => {
            dispatch(getBrand()); 
        };

        eventBus.on('REFRESH_ALL', listener);

        return () => {
            eventBus.off('REFRESH_ALL', listener); 
        };
    }, []);

    //
    if (brandLoading === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#006340" />
                <Text>Đang tải thương hiệu...</Text>
            </View>
        );
    }

    if (brandLoading === 'failed') {
        return (
            <View style={styles.centered}>
                <Text style={{ color: 'red' }}>Lỗi: {error}</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#111' }]}
            onPress={()=>{
                navigation.navigate('ProductlistScreen',{brandId:item})
            }}>
                <ImageBackground
                    source={require('../../../assets/images/biti_hunter.png')} // Ảnh nền bên ngoài
                    style={[StyleSheet.absoluteFill, { opacity: 0.7 }]}
                    resizeMode='repeat'
                />
                <MaskedView
                    style={{ flex: 1 }}
                    maskElement={
                        <View style={styles.maskedView}>
                            <Text style={styles.maskedText}>{item.name}</Text>
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
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 5,
    },
    maskedView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
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

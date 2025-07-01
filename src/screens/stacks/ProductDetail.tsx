import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ProDetailNav, ProDetailRoute } from "../../navigation/NavigationTypes";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../../components/buttons/CustomButton";
import ReviewForm from "../../components/listItems/ReviewForm";
import ToCartButton from "../../components/ToCartButton";
import { formatCurrency } from "../../utils/formatForm";
import { CartContext } from "../../contexts/CartContext";
import ScreenHeader from "../../components/ScreenHeader";
import { IMAGE_NOT_FOUND } from "../../types";

export default function ProductDetail({ navigation, route }: { navigation: ProDetailNav, route: ProDetailRoute }) {
    const product = route.params?.item;
    const [selectedSize, setSelectedSize] = useState(null);
    const [subtotal, setSubtotal] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setSubtotal(selectedSize ? product.price : 0);
        if (!selectedSize) setQuantity(1);
    }, [selectedSize]);

    return (
        <View style={styles.container}>
            {/* header */}
            <ScreenHeader
                title={product.category.name}
                rightButton={
                    <ToCartButton navigation={navigation} />
                }
            />
            <ScrollView>
                <View style={styles.contentContainer}>
                    {/* images */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: product.image || IMAGE_NOT_FOUND }}
                            style={styles.image}
                        />
                    </View>

                    {/* info */}
                    <View style={styles.contentWrapper}>
                        <Text style={styles.brandName}>
                            {product.brand.name}
                        </Text>
                        <Text style={styles.productName}>
                            {product.name}
                        </Text>
                        <Text style={styles.productDescription}>
                            {product.description}
                        </Text>
                    </View>

                    {/* sizes */}
                    <View style={styles.contentWrapper}>
                        <Text style={styles.sizeTitle}>
                            Kích thước
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            {
                                product.sizes.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setSelectedSize(selectedSize === item ? null : item);
                                        }}
                                        style={[styles.sizeButton, {
                                            backgroundColor:
                                                selectedSize === item ? '#006340' : '#F8F9FA',
                                        }]}
                                    >
                                        <Text style={{
                                            color: selectedSize === item ? '#FFFFFF' : '#707B81'
                                        }}>{item}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>

                    {/* Reviews */}
                    <View style={styles.contentWrapper}>
                        <View style={styles.reviewHeader}>

                            <Text style={styles.reviewTitle}>
                                Đánh giá sản phẩm
                            </Text>

                            <View style={styles.reviewScoreContainer}>
                                <Text>4.67</Text>
                                <Ionicons name="star" size={14} color="gold" />
                            </View>
                        </View>
                        {/* Có thể tạo thành component để truyền vào list Reivew */}
                        <View style={{ gap: 10 }}>
                            <ReviewForm
                                username="thailuan"
                                rating={5}
                                reviewText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusantium cumque nulla delectus inventore quas nobis libero iure, aspernatur sunt dolorum ducimus suscipit? Error obcaecati ipsa hic adipisci eveniet temporibus."
                                createdAt="12/07"
                            />
                            <ReviewForm
                                username="tientq"
                                rating={4}
                                reviewText="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto aliquam voluptates nemo aliquid similique illo est quam distinctio tenetur."
                                createdAt="02/07"
                            />
                            <ReviewForm
                                username="tuananh"
                                rating={5}
                                reviewText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero ducimus eos quia asperiores, aspernatur, iure corrupti, voluptates aliquid deserunt recusandae."
                                createdAt="22/06"
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* subtotal popup */}
            {
                subtotal ?
                    <View style={styles.subtotalPopup}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={styles.subtotalTextContainer}>
                                <Text style={styles.subtotalTitle}>Price</Text>
                                <Text style={styles.subtotalPrice}>{formatCurrency(subtotal * quantity)}</Text>
                            </View>
                            <View style={[styles.quantityWrapper, styles.buttonOutline]}>
                                <TouchableOpacity style={styles.quantityWrapper}
                                    disabled={quantity === 1}
                                    onPress={() => { setQuantity(quantity - 1) }}
                                >
                                    <FontAwesome5 name="minus" size={24} color="#006340" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quantityWrapper}
                                    onPress={() => { setQuantity(quantity + 1) }}
                                >
                                    <FontAwesome5 name="plus" size={24} color="#006340" />
                                </TouchableOpacity>
                                <View style={styles.quantity}>
                                    <TextInput
                                        style={styles.quantityInput}
                                        value={quantity.toString()}
                                        keyboardType="numeric"
                                        onChangeText={text => setQuantity(
                                            Number.parseInt(text) || 1
                                        )}
                                    />
                                </View>
                            </View>
                        </View>

                        <CustomButton
                            title="Thêm vào giỏ hàng"
                            onPress={() => {
                                addToCart(product, selectedSize, "Xanh", quantity);
                                setSelectedSize(null)
                                setQuantity(1);
                            }}
                        />
                    </View>
                    : null
            }
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 18,
        paddingBottom: 18,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: '16 / 10',
        marginBottom: 16,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    contentWrapper: {
        gap: 10,
        marginBottom: 16,
    },
    brandName: {
        color: '#006340',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    productName: {
        fontWeight: '600',
        fontSize: 24,
        color: '#1A2530',
    },
    productDescription: {
        lineHeight: 22,
        color: '#707B81',
    },
    sizeTitle: {
        fontWeight: '500',
        fontSize: 16,
    },
    sizeButton: {
        borderRadius: 100,
        width: 45,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    reviewTitle: {
        fontWeight: '500',
        fontSize: 16,
    },
    reviewScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtotalPopup: {
        position: 'absolute',
        bottom: 25,
        left: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 24,
        alignItems: 'center',
        gap: 12,
        // shadow cho Android
        elevation: 5,
        // shadow cho IOS
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 5 }, // Độ lệch của bóng
        shadowOpacity: 0.3, // Độ trong suốt của bóng
        shadowRadius: 5, // Độ rộng của bóng
    },
    subtotalTextContainer: {
        flex: 1,
        gap: 4,
    },
    subtotalTitle: {
        fontSize: 18,
        color: '#707B81',
    },
    subtotalPrice: {
        fontSize: 24,
        fontWeight: '500',
    },
    quantityWrapper: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden'
    },
    quantity: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityInput: {
        color: '#006340',
        height: '100%',
        width: '20%',
        textAlign: 'center'
    },
    buttonOutline: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#006340'
    },
});

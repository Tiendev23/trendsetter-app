import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProDetailNav, ProDetailRoute } from "../../navigation/NavigationTypes";
import CustomDirectionButton from "../../components/ChevronButton";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import ReviewForm from "../../components/ReviewForm";
import ToCartButton from "../../components/ToCartButton";
import { formatCurrency } from "../../utils/formatForm";
import { CartContext } from "../../contexts/CartContext";

export default function ProductDetailScreen({ navigation, route }: { navigation: ProDetailNav, route: ProDetailRoute }) {
    const product = route.params?.item;
    const [selectedSize, setSelectedSize] = useState(null);
    const [subtotal, setSubtotal] = useState(0)
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setSubtotal(selectedSize ? product.price : 0);
    }, [selectedSize])

    return (
        <View style={styles.container}>
            {/* header */}
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>
                        {product.category.name}
                    </Text>
                </View>
                <View style={styles.headerActions}>
                    <CustomDirectionButton
                        direction="back"
                        onPress={() => navigation.goBack()}
                    />

                    <ToCartButton navigation={navigation} />
                </View>
            </View>

            <ScrollView style={styles.scrollContainer}>

                {/* images */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
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
                    {/* <Text style={{
                        fontWeight: '500',
                        fontSize: 20
                    }}>
                        {formatCurrency(product.price)}
                    </Text> */}
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

                {/* Chỉ để tạo khoảng trống */}
                <View style={{ height: 30 }} />

            </ScrollView>

            {/* subtotal popup */}
            {
                subtotal ?
                    <View style={styles.subtotalPopup}>
                        <View style={styles.subtotalTextContainer}>
                            <Text style={styles.subtotalTitle}>Price</Text>
                            <Text style={styles.subtotalPrice}>{formatCurrency(subtotal)}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <CustomButton
                                title="Thêm vào giỏ hàng"
                                onPress={() => { addToCart(product, selectedSize, "Xanh") }}
                            />
                        </View>
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
    headerContainer: {
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
    scrollContainer: {
        flexDirection: 'column',
        paddingHorizontal: 18,
        flex: 1,
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
        borderRadius: '100%',
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
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 25,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
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
});

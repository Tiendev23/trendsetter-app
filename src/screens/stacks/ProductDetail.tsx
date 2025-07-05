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
import { IMAGE_NOT_FOUND, Product } from "../../types";
import PricePopup from "../../components/ProductDetails/PricePopup";
import SizeMapping from "../../components/ProductDetails/SizeMapping";

export default function ProductDetail({ navigation, route }: { navigation: ProDetailNav, route: ProDetailRoute }) {
    const demoProduct = {
        __v: 0,
        _id: "685bee08c9c6ffe04f185a3d",
        banner: "",
        brand: { __v: 0, _id: "685bec9ac9c6ffe04f185a2e", name: "Nike " },
        category: {
            __v: 0,
            _id: "685bec32c9c6ffe04f185a1e",
            name: "Giày thể thao",
            parent: null,
        },
        colors: ["Trắng", "Đen", "Xanh"],
        description:
            "Đôi giày chạy bộ với công nghệ Zoom Air ở mũi và gót chân mang lại khả năng đàn hồi tốt, giúp tăng tốc độ và bảo vệ chân. Upper dạng mesh thoáng khí, thiết kế nhẹ, tăng trải nghiệm chạy bộ hoặc sử dụng hàng ngày. Kiểu sneaker năng động, phối hợp tốt với trang phục thể thao và tông màu dễ mix.",
        images: [
            "https://res.cloudinary.com/trendsetter/image/upload/v1751064115/products/1751064115169-8ujcyyw4.webp",
        ],
        name: "Nike Air Zoom Pegasus 40",
        price: 35000,
        sizes: ["S", "M", "L", "XL"],
        stock: 50,
    };
    const [product, setProduct] = useState<Product>(route.params?.item || demoProduct);
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
                            source={{ uri: product.images[0] || IMAGE_NOT_FOUND }}
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
                        <SizeMapping
                            sizes={product.sizes}
                            state={{
                                selectedSize: [selectedSize, setSelectedSize],
                            }}
                        />
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
                subtotal &&
                <PricePopup
                    product={product}
                    subtotal={subtotal}
                    state={{
                        selectedSize: [selectedSize, setSelectedSize],
                        quantity: [quantity, setQuantity]
                    }}
                />
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
        height: 45,
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
});

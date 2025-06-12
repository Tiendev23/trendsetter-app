import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ProDetailNav } from "../../navigation/NavigationTypes";
import CustomDirectionButton from "../../components/DirectionButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import ReviewForm from "../../components/ReviewForm";


export default function ProductDetail({ navigation }: { navigation: ProDetailNav }) {
    const [product, setProduct] = useState({
        _id: "683fea03ba6f7bc4e44be69e",
        name: "Giày Thể Thao Nam",
        price: 299000,
        category: "Giày thể thao",
        brand: "Biti's Hunter",
        image: 'https://agiay.vn/wp-content/uploads/2023/02/giay_the_thao_nam_AG0205-6.jpg',
        banner: null,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quibusdam ipsam enim eum quo corrupti? Autem repellendus aut sed dolorum tempora est. Deleniti maxime expedita, ipsam cumque corporis aliquid aperiam.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Đen"],
        __v: 0
    })
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const [selectedSize, setSelectedSize] = useState(null);
    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        setSubtotal(selectedSize ? product.price : 0);
    }, [selectedSize])

    return (
        <View style={{
            backgroundColor: '#FFF',
            flex: 1,
        }}>
            {/* header */}
            <View>
                <View style={{
                    paddingVertical: 22,
                    paddingHorizontal: 18,
                }}>
                    <Text style={{
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 20,
                        color: '#006340',
                        textAlign: 'center',
                    }}>
                        {product.category}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: 18,
                }}>
                    <CustomDirectionButton
                        direction="back"
                        onPress={() => navigation.goBack()}
                    />

                    <MaterialCommunityIcons
                        name="shopping-outline"
                        size={24} color="black"
                        style={{ padding: 10 }}
                        onPress={null}
                    />
                </View>
            </View>

            <ScrollView style={{
                flexDirection: 'column',
                paddingHorizontal: 18,
                flex: 1,
            }}>

                {/* images */}
                <View style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    marginBottom: 16,
                }}>
                    <Image
                        source={{ uri: product.image }}
                        style={{
                            flex: 1,
                            resizeMode: 'contain'
                        }}
                    />
                </View>

                {/* info */}
                <View style={{
                    gap: 10,
                    marginBottom: 16,
                }}>
                    <Text style={{
                        color: '#006340',
                        fontSize: 16,
                        textTransform: 'uppercase',
                    }}>
                        {product.brand}
                    </Text>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 24,
                        color: '#1A2530',
                    }}>
                        {product.name}
                    </Text>
                    {/* <Text style={{
                        fontWeight: '500',
                        fontSize: 20
                    }}>
                        {formatCurrency(product.price)}
                    </Text> */}
                    <Text style={{
                        lineHeight: 22,
                        color: '#707B81'
                    }}>
                        {product.description}
                    </Text>
                </View>

                {/* sizes */}
                <View style={{
                    gap: 10,
                    marginBottom: 16,
                }}>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 16,
                    }}>
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
                                    style={{
                                        borderRadius: '100%',
                                        backgroundColor:
                                            selectedSize === item ? '#006340' : '#F8F9FA',
                                        width: 45,
                                        aspectRatio: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
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
                <View style={{
                    gap: 10,
                    marginBottom: 16,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>

                        <Text style={{
                            fontWeight: '500',
                            fontSize: 16,
                        }}>
                            Đánh giá sản phẩm
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text>4.67</Text>
                            <Ionicons name="star" size={14} color="gold" />
                        </View>
                    </View>
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

            </ScrollView>

            {/* subtotal popup */}
            {
                subtotal ?
                    <View style={{
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
                    }}>
                        <View style={{
                            flex: 1,
                            gap: 4,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#707B81'
                            }}>Price</Text>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: '500'
                            }}>{formatCurrency(subtotal)}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                        }}>
                            <CustomButton
                                title="Thêm vào giỏ hàng"
                                onPress={() => { }}
                            />
                        </View>
                    </View>
                    : null
            }
        </View >
    )
};

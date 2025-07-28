import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { CampaignBanner, DescRender, ImageSlider, PriceDisplay, ReviewHeader, ReviewsRender, SizeSelector, VariantSelector } from "./components";
import { useCartContext } from "@/contexts/CartContext";
import { CartItem, ObjectId, ProductDetails, Review, Variant, VariantSize } from "@/types";
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;

type Props = {
    product: ProductDetails;
    initialVariantId: ObjectId;
};
export default function ProductDetailContent({ product, initialVariantId }: Props) {
    const { brand, name, campaign, description, gender, rating, variants } = product;
    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        variants.find(v => v._id === initialVariantId) || variants[0]
    );
    const [inventories, setInventories] = useState<VariantSize[]>(selectedVariant.inventories);
    const [selectedSize, setSelectedSize] = useState<VariantSize | null>(null);
    const { addToCart } = useCartContext();
    const [paddingBottom, setPaddingBottom] = useState<number>(0);

    useEffect(() => {
        setInventories(selectedVariant.inventories);
        setSelectedSize(null);
    }, [selectedVariant]);

    const scrollRef = useRef<ScrollView>(null);
    const sizesViewRef = useRef<View>(null);

    function handleSelectVariant(item: Variant) {
        setSelectedVariant(item);
        setPaddingBottom(0);
    }

    function handleSelectVariantSize(item: VariantSize) {
        if (selectedSize?._id === item._id) {
            setSelectedSize(null);
            setPaddingBottom(0);
        } else {
            setSelectedSize(item);
            setTimeout(() => {
                if (sizesViewRef.current && scrollRef.current) {
                    /**
                     *  Đo khoảng cách từ sizesViewRef đến vị trí của scrollView
                     *  @value x là khoảng cách từ trái của sizesViewRef đến trái của scrollRef
                     *  @value y là khoảng cách từ trên của sizesViewRef đến trên của scrollRef
                     *  @value width là chiều rộng của sizesViewRef
                     *  @value height là chiều cao của sizesViewRef
                     */
                    sizesViewRef.current.measureLayout(
                        scrollRef.current as unknown as View,
                        (x, y, width, height) => {
                            const scrollOffset = Math.max(y + (height / 2) - (screenHeight / 2), 0);
                            scrollRef.current?.scrollTo({ y: scrollOffset, animated: true });
                        }
                    );
                }
            }, 100);
        }
    };
    
    function handleAddToCart(item: CartItem) {
        addToCart(item);
        setSelectedSize(null);
        setPaddingBottom(0);
    };

    return (
        <View style={styles.container}>
            <Animated.ScrollView ref={scrollRef}>
                <View style={{ paddingBottom: paddingBottom }}>
                    <View style={styles.sliderWrapper}>
                        <ImageSlider
                            images={selectedVariant.images}
                        />
                        <CampaignBanner campaign={campaign} price={selectedVariant.basePrice} />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentWrapper}>
                            <Text style={styles.brandName}>
                                {brand.name}
                            </Text>
                            <Text style={styles.productName}>
                                {name}
                            </Text>
                            <DescRender source={description} />
                        </View>

                        <View style={styles.contentWrapper}>
                            <Text style={styles.contentLabel}>
                                Biến thể
                            </Text>
                            <VariantSelector
                                data={product.variants}
                                selectedVariant={selectedVariant}
                                onSelectVariant={handleSelectVariant}
                            />
                        </View>

                        <View
                            ref={sizesViewRef}
                            style={styles.contentWrapper}
                        >
                            <Text style={styles.contentLabel}>
                                Kích cỡ
                            </Text>
                            <SizeSelector
                                data={inventories}
                                selectedSize={selectedSize}
                                onSelectSize={handleSelectVariantSize}
                            />
                        </View>
                        {
                            (rating.count != 0) &&
                            <View style={styles.contentWrapper}>
                                <ReviewHeader rating={rating} />
                                <ReviewsRender productId={product._id} />
                            </View>
                        }
                    </View>
                </View>
            </Animated.ScrollView>

            <PriceDisplay
                product={product}
                variant={selectedVariant}
                selectedSize={selectedSize}
                onSelectSize={{
                    setSelectedSize: setSelectedSize,
                    setPaddingBottom: setPaddingBottom
                }}
                onAddToCart={handleAddToCart}
            />
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
    sliderWrapper: {
        width: '100%',
        aspectRatio: '16 / 10',
        marginBottom: 16,
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
        lineHeight: 30,
        color: '#1A2530',
    },
    contentLabel: {
        fontWeight: '500',
        fontSize: 16,
    },
});

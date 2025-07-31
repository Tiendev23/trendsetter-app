import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { CampaignBanner, DescRender, ImageSlider, PriceDisplay, ReviewHeader, ReviewsRender, SizeSelector, VariantSelector } from "./components";
import { useCartContext } from "@/contexts/CartContext";
import { CartItem, ObjectId, ProductDetails, Variant, VariantSize } from "@/types";
import { Dimensions } from 'react-native';
import { showInfoToast } from "@/utils/toast";
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
    const prevOffsetRef = useRef<number>(-1);

    function handleSelectVariantSize(item: VariantSize) {
        if (selectedSize?._id === item._id) {
            setSelectedSize(null);
            setPaddingBottom(0);
            prevOffsetRef.current = -1;
        } else {
            setSelectedSize(item);
            setTimeout(() => {
                setPaddingBottom(175);
            }, 300);
            setTimeout(() => {
                if (sizesViewRef.current && scrollRef.current) {
                    sizesViewRef.current.measureLayout(
                        scrollRef.current as unknown as View,
                        (x, y, width, height) => {
                            const offset = Math.max(y + height / 2 - screenHeight / 2, 0);
                            if (Math.abs(offset - prevOffsetRef.current) > 1) {
                                scrollRef.current?.scrollTo({ y: offset, animated: true });
                                prevOffsetRef.current = offset;
                            };
                        }
                    );
                };
            }, 150);
        }
    };

    function handleAddToCart(item: CartItem) {
        addToCart(item);
        setSelectedSize(null);
        setPaddingBottom(0);
    };

    function handleOnClick() {
        showInfoToast({
            title: "Thông báo",
            message: "Tính năng đang được phát triển"
        })
    }

    const ReviewSection = () => {
        if (rating.count == 0) return null;
        return (
            <View style={styles.contentWrapper}>
                <ReviewHeader
                    rating={rating}
                    onClick={handleOnClick}
                />
                <ReviewsRender
                    productId={product._id}
                    handleOnClick={handleOnClick}
                />
            </View>
        )
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
                                onSelectVariant={(item: Variant) => {
                                    setSelectedVariant(item);
                                    setPaddingBottom(0);
                                    prevOffsetRef.current = -1;
                                }}
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

                        <ReviewSection />
                    </View>
                </View>
            </Animated.ScrollView>

            <PriceDisplay
                product={product}
                variant={selectedVariant}
                selectedSize={selectedSize}
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

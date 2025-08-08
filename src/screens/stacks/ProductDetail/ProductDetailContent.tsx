import { Animated, InteractionManager, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CampaignBanner, DescRender, ImageSlider, PriceDisplay, ReviewSection, SizeSelector, VariantSelector } from "./components";
import { useCartContext } from "@/contexts/CartContext";
import { CartItem, ObjectId, ProductDetails, Variant, VariantSize } from "@/types";
import { Dimensions } from 'react-native';
import { showInfoToast } from "@/utils/toast";
import { formatCurrency } from "@/utils/formatForm";
import { RefreshControl } from "react-native-gesture-handler";

const screenHeight = Dimensions.get('window').height;
const SizeSelectorMemo = React.memo(SizeSelector);
const VariantSelectorMemo = React.memo(VariantSelector);
const ReviewSectionMemo = React.memo(ReviewSection);

type Props = {
    product: ProductDetails;
    initialVariantId: ObjectId;
    refreshing: boolean;
    onRefresh: () => Promise<void>;

};
export default function ProductDetailContent({ product, initialVariantId, onRefresh, refreshing }: Props) {
    const { brand, name, campaign, description, gender, rating, variants } = product;
    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        variants.find(v => v._id === initialVariantId) || variants[0]
    );
    const [inventories, setInventories] = useState<VariantSize[]>(selectedVariant.inventories);
    const [selectedSize, setSelectedSize] = useState<VariantSize | null>(null);
    const { addToCart } = useCartContext();

    const animatedPadding = useRef(new Animated.Value(0)).current;

    const animatePadding = useCallback((toValue: number) => {
        Animated.timing(animatedPadding, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [animatedPadding]);


    useEffect(() => {
        setInventories(selectedVariant.inventories);
        setSelectedSize(null);
    }, [selectedVariant]);

    const isDiscounted = (selectedVariant.basePrice != selectedVariant.finalPrice);

    const scrollRef = useRef<ScrollView>(null);
    const sizesViewRef = useRef<View>(null);
    const prevOffsetRef = useRef<number>(-1);

    function handleSelectVariantSize(item: VariantSize) {
        if (selectedSize?._id === item._id) {
            setSelectedSize(null);
            animatePadding(0);
            prevOffsetRef.current = -1;
            return;
        }

        setSelectedSize(item);
        animatePadding(200);

        InteractionManager.runAfterInteractions(() => {
            if (sizesViewRef.current && scrollRef.current) {
                sizesViewRef.current.measureLayout(
                    scrollRef.current as unknown as View,
                    (x, y, width, height) => {
                        const offset = Math.max(y + height / 2 - screenHeight / 2, 0);
                        if (Math.abs(offset - prevOffsetRef.current) > 1) {
                            scrollRef.current?.scrollTo({ y: offset, animated: true });
                            prevOffsetRef.current = offset;
                        }
                    }
                );
            }

        });
    };

    function handleAddToCart(item: CartItem) {
        addToCart(item);
        setSelectedSize(null);
        animatePadding(0);
    };

    function handleReviewClick() {
        showInfoToast({
            title: "Thông báo",
            message: "Tính năng đang được phát triển"
        })
    }


    const onSelectVariant = useCallback((v: Variant) => {
        setSelectedVariant(v);
        animatePadding(0);
        prevOffsetRef.current = -1;
    }, []);

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={styles.container}
                nestedScrollEnabled={true}
                scrollEventThrottle={16}
            >
                <Animated.View style={{ paddingBottom: animatedPadding }}>
                    <View style={styles.sliderWrapper}>
                        <ImageSlider
                            images={selectedVariant.images}
                        />
                        <CampaignBanner campaign={campaign} price={selectedVariant.basePrice} />
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={[styles.contentWrapper, styles.priceWrapper]}>
                            <Text style={[styles.finalPrice, styles.price]}>
                                {formatCurrency(selectedVariant.finalPrice)}
                            </Text>
                            {
                                (isDiscounted) &&
                                <Text style={[styles.basePrice, styles.price]}>
                                    {formatCurrency(selectedVariant.basePrice)}
                                </Text>
                            }
                        </View>

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
                            <VariantSelectorMemo
                                data={product.variants}
                                selectedVariant={selectedVariant}
                                onSelectVariant={onSelectVariant}
                            />
                        </View>

                        <View
                            ref={sizesViewRef}
                            style={styles.contentWrapper}
                        >
                            <Text style={styles.contentLabel}>
                                Kích cỡ
                            </Text>
                            <SizeSelectorMemo
                                data={inventories}
                                selectedSize={selectedSize}
                                onSelectSize={handleSelectVariantSize}
                            />
                        </View>

                        <ReviewSectionMemo
                            rating={rating}
                            productId={product._id}
                            handleOnClick={handleReviewClick}
                        />
                    </View>
                </Animated.View>
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
        gap: 16,
    },
    sliderWrapper: {
        width: '100%',
        aspectRatio: '16 / 10',
        marginBottom: 16,
    },
    contentWrapper: {
        gap: 10,
    },
    priceWrapper: {
        flexDirection: 'row',
    },
    price: {
        fontFamily: 'Raleway',
        fontWeight: '700',
    },
    finalPrice: {
        fontSize: 24,
        color: '#006340',
    },
    basePrice: {
        fontSize: 16,
        color: '#707B81',
        textAlignVertical: "bottom",
        textDecorationLine: "line-through",
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

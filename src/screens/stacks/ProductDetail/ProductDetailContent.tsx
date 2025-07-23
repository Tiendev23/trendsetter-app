import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { CampaignBanner, DescRender, ImageSlider, PriceDisplay, ReviewHeader, ReviewsRender, SizeSelector, VariantSelector } from "./components";
import { useCartContext } from "@/contexts/CartContext";
import { ObjectId, ProductDetails, Review, Variant, VariantSize } from "@/types";

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

    return (
        <View style={styles.container}>
            <ScrollView>
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
                                onSelectVariant={setSelectedVariant}
                            />
                        </View>

                        <View style={styles.contentWrapper}>
                            <Text style={styles.contentLabel}>
                                Kích cỡ
                            </Text>
                            <SizeSelector
                                data={inventories}
                                selectedSize={selectedSize}
                                onSelectSize={{
                                    setSelectedSize: setSelectedSize,
                                    setPaddingBottom: setPaddingBottom
                                }}
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
            </ScrollView>

            <PriceDisplay
                variant={{
                    id: selectedVariant._id,
                    price: selectedVariant.finalPrice,
                }}
                selectedSize={selectedSize}
                onSelectSize={{
                    setSelectedSize: setSelectedSize,
                    setPaddingBottom: setPaddingBottom
                }}
                onAddToCart={addToCart}
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

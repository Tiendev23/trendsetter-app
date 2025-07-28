import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ProDetailNav, ProDetailRoute } from "@/navigation/NavigationTypes";
import { useEffect } from "react";
import { ToCartButton, ScreenHeader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/features/product/productSlice";
import { BlurView } from "expo-blur";
import { showErrorToast } from "@/utils/toast";
import ProductDetailContent from "./ProductDetailContent";

export default function ProductDetail({ navigation, route }: { navigation: ProDetailNav, route: ProDetailRoute }) {
    const { category, productId, variantId } = route.params;
    const dispatch = useAppDispatch();
    const { data: product, status, error } = useAppSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    if (status === 'loading' || status === 'failed' || !product) {
        if (error) {
            console.error('Error fetching product:', error);
            showErrorToast({
                title: "Lỗi tải sản phẩm",
                message: error || 'Không thể tải sản phẩm. Đang thử tải lại.'
            });
            dispatch(fetchProductById(productId));
        }
        return (
            <BlurView intensity={10} style={styles.blurBackground}>
                <ActivityIndicator size="large" color="#006340" />
            </BlurView>
        )
    };

    return (
        <View style={styles.container}>
            <ScreenHeader
                title={category}
                rightButton={
                    <ToCartButton navigation={navigation} />
                }
            />
            <ProductDetailContent
                product={product}
                initialVariantId={variantId}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    blurBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
});

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ProDetailNav, ProDetailRoute } from "@/types";
import { useEffect } from "react";
import { ToCartButton, ScreenHeader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/features/product/productSlice";
import { BlurView } from "expo-blur";
import { showErrorToast } from "@/utils/toast";
import ProductDetailContent from "./ProductDetailContent";
import { useRefresh } from "@/hooks/useRefresh";

type Props = {
    navigation: ProDetailNav;
    route: ProDetailRoute
};
export default function ProductDetail({ navigation, route }: Props) {
    const { productId, variantId } = route.params;
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.product);
    const product = useAppSelector(state => state.product.data?.data);
    const { refreshing, onRefresh } = useRefresh(() => fetchProductById(productId));

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    if (status === 'loading' || status === 'failed' || !product) {
        if (error) {
            showErrorToast({
                title: `Lỗi tải sản phẩm ${error.code}`,
                message: error.message
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
                title={product.category.name}
                rightButton={
                    <ToCartButton onPress={() =>
                        navigation.navigate("Cart", undefined, { pop: true })
                    } />
                }
            />

            <ProductDetailContent
                product={product}
                initialVariantId={variantId}
                refreshing={refreshing}
                onRefresh={onRefresh}
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

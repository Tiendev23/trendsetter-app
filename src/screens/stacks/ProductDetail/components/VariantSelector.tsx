import { ObjectId, Variant } from "@/types";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
    variants: Variant[];
    selectedVariant: Variant;
    onSelectVariant: (variant: Variant) => void;
};

export default function VariantSelector({ variants, selectedVariant, onSelectVariant }: Props) {
    return (
        <View style={styles.container}>
            {
                variants.flat().map(variant => (
                    <TouchableOpacity
                        key={variant._id}
                        onPress={() => onSelectVariant(variant)}
                        style={[styles.button,
                        (variant._id === selectedVariant._id) && [styles.scale, styles.shadow]
                        ]}
                    >
                        <Image
                            source={{ uri: variant.images[0] }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20
    },
    button: {
        width: 60,
        borderRadius: 140,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        borderRadius: 999,
    },
    shadow: {
        shadowColor: '#006340', // Màu bóng
        // shadow cho Android
        elevation: 8,
        // shadow cho IOS
        shadowOffset: { width: 5, height: 5 }, // Độ lệch của bóng
        shadowOpacity: 0.6, // Độ trong suốt của bóng
        shadowRadius: 6, // Độ rộng của bóng
    },
    scale: {
        borderWidth: 1,
        borderColor: '#006340',
        transform: [{ scale: 1.25 }],
        marginHorizontal: 6,
    }
})
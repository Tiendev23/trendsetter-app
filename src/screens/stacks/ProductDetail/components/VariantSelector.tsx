import { ObjectId, Variant } from "@/types";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
    data: Variant[];
    selectedVariant: Variant;
    onSelectVariant: (variant: Variant) => void;
};

export default function VariantSelector({ data, selectedVariant, onSelectVariant }: Props) {
    return (
        <View style={styles.container}>
            {
                data.map(variant => (
                    <TouchableOpacity
                        key={variant._id}
                        onPress={() => onSelectVariant(variant)}
                        style={[styles.button,
                        (variant._id === selectedVariant._id) && styles.shadow
                        ]}
                    >
                        <Image
                            source={{ uri: variant.images[0] }}
                            style={[styles.image]}
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
        width: 70,
        borderRadius: 140,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        borderRadius: 140,
    },
    shadow: {
        // shadow cho Android
        elevation: 5,
        // shadow cho IOS
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 5, height: 5 }, // Độ lệch của bóng
        shadowOpacity: 0.3, // Độ trong suốt của bóng
        shadowRadius: 3, // Độ rộng của bóng
    },
})
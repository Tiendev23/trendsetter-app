import { ObjectId, VariantSize } from "@/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    data: VariantSize[];
    selectedSize: VariantSize | null;
    onSelectSize: {
        setSelectedSize: (size: VariantSize | null) => void;
        setPaddingBottom: (height: number) => void;
    }
};

export default function VariantSelector({ data, selectedSize, onSelectSize }: Props) {
    const { setSelectedSize, setPaddingBottom } = onSelectSize;
    return (
        <View style={styles.container}>
            {
                data?.map((item, index) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                            if (selectedSize?._id === item._id) {
                                setSelectedSize(null);
                                setPaddingBottom(0);
                            } else
                                setSelectedSize(item);
                        }}
                        style={[styles.button, {
                            backgroundColor:
                                selectedSize?._id === item._id ? '#006340' : '#F8F9FA',
                        }]}
                    >
                        <Text style={{
                            color: selectedSize?._id === item._id ? '#FFFFFF' : '#707B81'
                        }}>{item.size}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12
    },
    button: {
        borderRadius: 100,
        width: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: '100%',
    },
    shadow: {
        // shadow cho Android
        elevation: 3,
        // shadow cho IOS
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 5 }, // Độ lệch của bóng
        shadowOpacity: 0.3, // Độ trong suốt của bóng
        shadowRadius: 3, // Độ rộng của bóng
    },
})
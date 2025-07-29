import { ObjectId, VariantSize } from "@/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    data: VariantSize[];
    selectedSize: VariantSize | null;
    onSelectSize: (item: VariantSize) => void;
};

export default function SizeSelector({ data, selectedSize, onSelectSize }: Props) {
    return (
        <View style={styles.container}>
            {
                data?.map((item, index) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => onSelectSize(item)}
                        style={[styles.button, {
                            backgroundColor:
                                selectedSize?._id === item._id ? '#006340' : '#F8F9FA',
                        }]}
                    >
                        <Text style={{
                            color: selectedSize?._id === item._id ? '#FFFFFF' : '#707B81'
                        }}>
                            {item.size}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 12,
    },
    button: {
        borderRadius: 100,
        height: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
})
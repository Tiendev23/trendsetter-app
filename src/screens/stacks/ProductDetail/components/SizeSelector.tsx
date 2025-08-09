import { VariantSize } from "@/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
                        style={[
                            styles.button,
                            (selectedSize?._id === item._id) && styles.selected,
                            (!item.active) && styles.buttonDisabled
                        ]}
                        disabled={!item.active}
                    >
                        <Text style={[
                            styles.label,
                            (selectedSize?._id === item._id) && styles.highlight,
                            (!item.active) && styles.labelDisabled
                        ]}>
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
        overflow: 'hidden',
        backgroundColor: "#F8F9FA"
    },
    buttonDisabled: {
        backgroundColor: '#E0E0E0', // màu xám nhạt
        opacity: 0.6, // làm mờ để thể hiện không tương tác
    },
    label: {
        color: "#707B81"
    },
    labelDisabled: {
        color: '#A0A0A0', // màu chữ xám nhạt hơn
    },
    selected: {
        backgroundColor: "#006340"
    },
    highlight: {
        color: "#FFFFFF"
    }
})
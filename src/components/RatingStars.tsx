import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type Props = {
    rating: number;   // ví dụ: 4.8
    size?: number;    // kích thước icon
};

export default function RatingStars({ rating, size = 14 }: Props) {
    const fullStars = Math.floor(rating);       // Số sao đầy
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.95; // Cho độ chính xác tốt
    const totalStars = 5;

    return (
        <View style={{ flexDirection: 'row', gap: 2 }}>
            {[...Array(fullStars)].map((_, index) => (
                <Ionicons key={`full-${index}`} name="star" size={size} color="gold" />
            ))}

            {hasHalfStar && (
                <Ionicons key="half" name="star-half" size={size} color="gold" />
            )}

            {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                <Ionicons key={`empty-${index}`} name="star-outline" size={size} color="gold" />
            ))}
        </View>
    );
}
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CartNav } from "@/types";
import { ScreenHeader } from "@/components";
import CartContent from "./CartContent";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCartContext } from "@/contexts/CartContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

type Props = {
    visible: boolean;
    isEditable: boolean;
    onVisible: () => void;
}

const RightButton = ({ isEditable, visible, onVisible }: Props) => {
    const iconColor = isEditable ? "#C21E0C" : "#1A2530";
    if (visible) return (
        <TouchableOpacity
            style={{ padding: 10 }}
            onPress={onVisible}
        >
            <FontAwesome5 name="edit" size={24} color={iconColor} />
        </TouchableOpacity>
    )
}

export default function Cart({ navigation }: { navigation: CartNav }) {
    const { user } = useAuthContext();
    const cart = useCartContext();
    const [isEditable, setIsEditable] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <ScreenHeader
                title={"Giỏ Hàng"}
                rightButton={
                    <RightButton
                        visible={cart.items.length > 0}
                        isEditable={isEditable}
                        onVisible={() => setIsEditable(prev => !prev)}
                    />
                }
            />
            <CartContent
                navigation={navigation}
                isEditable={isEditable}
                cartContext={cart}
                user={user}
                onDelete={() => setIsEditable(false)}
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

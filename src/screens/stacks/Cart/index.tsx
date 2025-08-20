import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CartNav } from "@/types";
import { ScreenHeader } from "@/components";
import CartContent from "./CartContent";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCartContext } from "@/contexts/CartContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { GuideModal } from "./components";
import * as Storage from "@/services/asyncStorage.service"
import { KEY } from "@/constants";

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
    const [visible, setGuideVisible] = useState(false);

    useEffect(() => {
        Storage.getItem(KEY.C_GUIDE).then((value) => {
            if (!value) {
                setGuideVisible(true);
                Storage.saveItem(KEY.C_GUIDE, true);
            }
        })
    }, [])


    return (
        <View style={styles.container}>
            <ScreenHeader
                title={"Giỏ Hàng"}
                rightButton={
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={() => setGuideVisible(true)}
                        >
                            <FontAwesome5 name="question-circle" size={24} color="#006340" />
                        </TouchableOpacity>
                        <RightButton
                            visible={cart.items.length > 0}
                            isEditable={isEditable}
                            onVisible={() => setIsEditable(prev => !prev)}
                        />
                    </View>
                }
            />

            <CartContent
                navigation={navigation}
                isEditable={isEditable}
                cartContext={cart}
                user={user}
                onDelete={() => setIsEditable(false)}
            />

            <GuideModal
                visible={visible}
                handleCloseGuide={() => setGuideVisible(false)}
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

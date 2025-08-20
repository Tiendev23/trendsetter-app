import React, { useMemo, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { CartItem as CartItemType } from '@/types/models';
import { formatCurrency } from '@/utils/formatForm';
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

type BaseActionProps = {
    drag: SharedValue<number>;
}

type LeftProps = BaseActionProps & {
    itemQuantity: number;
    handleQuantityChange: (newQuantity: number) => void;
}

function LeftAction({ itemQuantity, drag, handleQuantityChange }: LeftProps) {
    const [width, setWidth] = useState(0);
    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value - width }],
        };
    });

    return (
        <Reanimated.View
            onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
            style={styleAnimation}
        >
            <View style={[styles.sideActionWrapper, styles.button, styles.leftButton]}>
                <RectButton style={[styles.button, { width: '100%' }]}
                    onPress={() => handleQuantityChange(itemQuantity + 1)}
                >
                    <FontAwesome5 name="plus" size={24} color="#FFFFFF" />
                </RectButton>
                <Text style={{ color: '#FFFFFF' }}>
                    {itemQuantity}
                </Text>
                <RectButton style={[styles.button, { width: '100%' }]}
                    onPress={() => handleQuantityChange(itemQuantity - 1)}
                >
                    <FontAwesome5 name="minus" size={24} color="#FFFFFF" />
                </RectButton>
            </View>
        </Reanimated.View>
    );
}

type RightProps = BaseActionProps & {
    handleDelete: () => void;
}

function RightAction({ drag, handleDelete }: RightProps) {
    const [width, setWidth] = useState(0);
    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value + width }],
        };
    });

    return (
        <Reanimated.View
            onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
            style={styleAnimation}
        >
            <TouchableOpacity
                style={[styles.sideActionWrapper, styles.button, styles.rightButton]}
                onPress={handleDelete}
            >
                <FontAwesome5 name="trash-alt" size={32} color="#FFFFFF" />
            </TouchableOpacity>
        </Reanimated.View>
    );
}
/**
 *  Đọc doc ở đây https://docs.swmansion.com/react-native-gesture-handler/docs/components/reanimated_swipeable#rightthreshold
 */

type Props = {
    item: CartItemType;
    isEditable: boolean;
    isSelected: boolean;
    handleCartItemClick: () => void;
    handleSelectItem: () => void;
    handleUpdateItem: (newQuantity: number) => void;
    handleDeleteItem: () => void
}
export default function CartItem({
    item, isSelected, isEditable,
    handleCartItemClick, handleSelectItem, handleUpdateItem, handleDeleteItem
}: Props) {
    const buttonStyle = useMemo(() => {
        if (isEditable)
            return isSelected
                ? styles.selectedEditableStyle : styles.unselectedEditableStyle;
        else
            return isSelected
                ? styles.selectedUneditableStyle : styles.unselectedUneditableStyle;
    }, [isEditable, isSelected]);
    const iconColor = isSelected ? "#FFFFFF"
        : isEditable ? "#C21E0C" : "#006340";

    const CheckButton = () => {
        if (!isEditable && !item.active) return null;
        return (
            <TouchableOpacity
                style={[styles.checkButton, buttonStyle]}
                onPress={() => handleSelectItem()}
            >
                <FontAwesome5 name="check" size={40}
                    color={iconColor} />
            </TouchableOpacity>
        )
    }

    const isDiscounted = (item.basePrice != item.finalPrice);

    return (
        <ReanimatedSwipeable
            enabled
            friction={3}
            enableTrackpadTwoFingerGesture
            rightThreshold={80}
            renderLeftActions={(progress, drag) => {
                if (!item.active) return undefined;
                return <LeftAction drag={drag} itemQuantity={item.quantity} handleQuantityChange={handleUpdateItem} />
            }}
            renderRightActions={(progress, drag) => (
                <RightAction drag={drag} handleDelete={handleDeleteItem} />
            )}
        >
            <View style={[styles.contentContainer]}>
                <CheckButton />

                <TouchableOpacity
                    style={styles.contentWrapper}
                    onPress={() => handleCartItemClick()}
                >
                    <View style={styles.image}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={styles.itemName}
                        >
                            {item.name}
                        </Text>
                        <View style={{ gap: 6 }}>
                            <Text>
                                Size {item.size.size} - Màu {item.color}
                            </Text>
                            {
                                item.active ?
                                    <View style={styles.priceWrapper}>
                                        <Text style={[styles.price, styles.finalPrice]}>
                                            {formatCurrency(item.finalPrice)}
                                        </Text>
                                        {
                                            (isDiscounted) &&
                                            <Text style={[styles.price, styles.subText, styles.basePriceDecor]}>
                                                {formatCurrency(item.basePrice)}
                                            </Text>
                                        }
                                    </View>
                                    :
                                    <Text style={styles.subText}>
                                        Hết hàng
                                    </Text>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ReanimatedSwipeable>
    );
};

const styles = StyleSheet.create({
    checkButton: {
        width: 60,
        top: 0,
        bottom: 0,
        borderTopStartRadius: 8,
        borderBottomStartRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 14,
        padding: 18,
        flexGrow: 1,
    },
    selectedUneditableStyle: {
        borderColor: '#006340',
        backgroundColor: '#006340'
    },
    unselectedUneditableStyle: {
        borderColor: '#006340',
        backgroundColor: '#FFFFFF'
    },
    selectedEditableStyle: {
        borderColor: '#C21E0C',
        backgroundColor: '#C21E0C'
    },
    unselectedEditableStyle: {
        borderColor: '#C21E0C',
        backgroundColor: '#FFFFFF'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        backgroundColor: '#006340',
        marginLeft: 18
    },
    rightButton: {
        backgroundColor: '#C21E0C',
        marginRight: 18
    },
    sideActionWrapper: {
        width: 65,
        borderRadius: 8,
        overflow: 'hidden'
    },
    contentContainer: {
        marginHorizontal: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        flexDirection: 'row',
    },
    image: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 15,
        overflow: 'hidden'
    },
    infoWrapper: {
        flex: 1,
        flexShrink: 1,
        flexGrow: 1,
        height: 100,
        justifyContent: 'space-between',
    },
    itemName: {
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        fontSize: 16,
        color: '#1A2530',
        lineHeight: 20
    },
    priceWrapper: {
        flexDirection: 'row',
        columnGap: 4,
    },
    price: {
        fontFamily: 'Raleway',
        fontWeight: '600',
    },
    finalPrice: {
        fontSize: 16,
        color: '#006340',
    },
    subText: {
        color: '#707B81',
        textAlignVertical: "bottom",
    },
    basePriceDecor: {
        fontSize: 12,
        textDecorationLine: "line-through",
    }
});
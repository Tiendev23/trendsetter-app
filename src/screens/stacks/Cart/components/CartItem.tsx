import React, { useMemo, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { CartItem as Item } from '@/types/models';
import { formatCurrency } from '@/utils/formatForm';
import { useCartContext } from '@/contexts/CartContext';
import { FontAwesome5 } from '@expo/vector-icons';
import Skeleton from '@/components/loaders/Skeleton';
import { ObjectId } from '@/types';
import { RectButton } from 'react-native-gesture-handler';

type BaseActionProps = {
    item: Item;
    drag: SharedValue<number>;
}

type LeftProps = BaseActionProps & {
    onUpdateQuantity: (sizeId: ObjectId, newQuantity: number) => void;
}

function LeftAction({ item, drag, onUpdateQuantity }: LeftProps) {
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
                    onPress={() => {
                        onUpdateQuantity(
                            item.size._id,
                            item.quantity + 1
                        )
                    }}
                >
                    <FontAwesome5 name="plus" size={24} color="#FFFFFF" />
                </RectButton>
                <Text style={{ color: '#FFFFFF' }}>
                    {item.quantity}
                </Text>
                <RectButton style={[styles.button, { width: '100%' }]}
                    onPress={() => {
                        onUpdateQuantity(
                            item.size._id,
                            item.quantity - 1)
                    }}
                >
                    <FontAwesome5 name="minus" size={24} color="#FFFFFF" />
                </RectButton>
            </View>
        </Reanimated.View>
    );
}

type RightProps = BaseActionProps & {
    onDelete: (sizeId: ObjectId) => void;
}

function RightAction({ item, drag, onDelete }: RightProps) {
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
                onPress={() => onDelete(item.size._id)}
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
    item: Item;
    isSelected: boolean;
    isEditable: boolean;
    onSelect: (sizeId: ObjectId) => void;
    onUpdateItem: (sizeId: ObjectId, newQuantity: number) => void;
    onDeleteItem: (sizeId: ObjectId) => void
}
export default function CartItem({
    item, onSelect, isSelected,
    isEditable, onUpdateItem, onDeleteItem
}: Props) {

    const CheckedButton = () => {
        const buttonStyle = useMemo(() => {
            if (isEditable)
                return isSelected ? styles.selectedEditableStyle : styles.unselectedEditableStyle;
            else
                return isSelected ? styles.selectedUneditableStyle : styles.unselectedUneditableStyle;
        }, [isEditable, isSelected]);
        const iconColor = isSelected ? "#FFFFFF"
            : isEditable ? "#C21E0C" : "#006340";
        return (
            <TouchableOpacity
                style={[styles.checkButton, buttonStyle]}
                onPress={() => onSelect(item.size._id)}
            >
                <FontAwesome5 name="check" size={40}
                    color={iconColor} />
            </TouchableOpacity>
        )
    }

    return (
        <ReanimatedSwipeable
            enabled
            friction={3}
            enableTrackpadTwoFingerGesture
            rightThreshold={80}
            renderLeftActions={(progress, drag) => (
                <LeftAction
                    item={item} drag={drag}
                    onUpdateQuantity={onUpdateItem}
                />
            )}
            renderRightActions={(progress, drag) => (
                <RightAction
                    item={item} drag={drag}
                    onDelete={onDeleteItem}
                />
            )}
        >
            {
                (item != null) ?
                    <View style={styles.contentContainer}>
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
                                <Text style={styles.itemPrice}>
                                    {formatCurrency(item.finalPrice)}
                                </Text>
                            </View>
                        </View>

                        <CheckedButton />
                    </View>
                    :
                    <View style={styles.contentContainer}>
                        <View style={styles.image}>
                            <Skeleton width={'100%'} height={"100%"} />
                        </View>
                        <View style={styles.infoWrapper}>
                            <Skeleton width={200} height={20} />
                            <Skeleton width={150} height={20} />
                            <Skeleton width={100} height={20} />
                        </View>
                    </View>
            }
        </ReanimatedSwipeable>
    );
}

const styles = StyleSheet.create({
    checkButton: {
        width: 60,
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
        position: 'absolute',
        end: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
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
        flexDirection: 'row',
        padding: 18,
        gap: 18,
        alignItems: 'center',
        borderRadius: 8,
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
        marginEnd: 50,
    },
    itemName: {
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        fontSize: 16,
        color: '#1A2530',
        lineHeight: 20
    },
    itemPrice: {
        fontFamily: 'Raleway',
        fontWeight: '600',
        fontSize: 16,
        color: '#006340',
    }
});
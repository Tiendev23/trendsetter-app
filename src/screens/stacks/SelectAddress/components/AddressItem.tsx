import React, { useMemo, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Pressable } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { ShippingAddress } from '@/types/models';
import { getAddressDetail } from '@/utils/formatForm';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';


type TagProps = {
    isDefault: boolean;
    handleSetDefault?: () => void;
}
const Tag = ({ isDefault }: TagProps) => {
    if (!isDefault) return null;
    return (
        <View style={styles.tagWrapper}>
            <Text style={styles.tag}>
                Địa chỉ mặc định
            </Text>
        </View>
    )
}

const SetDefaultButton = ({ isDefault, handleSetDefault }: TagProps) => {
    if (isDefault) return null;
    return (
        <TouchableOpacity
            style={[styles.button, styles.starButton]}
            onPress={handleSetDefault}
        >
            <Fontisto name="favorite" size={32} color="#006340" />
        </TouchableOpacity>
    )
}

type ActionProps = {
    drag: SharedValue<number>;
    isDefault: boolean;
    handleSetDefault: () => void;
    handleDeleteAddress: () => void;
}

function RightAction({
    drag, isDefault,
    handleSetDefault,
    handleDeleteAddress
}: ActionProps) {
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
            <SetDefaultButton
                isDefault={isDefault}
                handleSetDefault={handleSetDefault}
            />
            <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDeleteAddress}
            >
                <FontAwesome5 name="trash-alt" size={32} color="#FFFFFF" />
            </TouchableOpacity>
        </Reanimated.View>
    );
}

type Props = {
    address: ShippingAddress;
    handleSetDefault: () => void;
    handleDeleteAddress: () => void;
    handleSelectAddress: () => void;
    handleEditAddress: () => void;
}
export default function AddressItem({
    address,
    handleSetDefault,
    handleDeleteAddress,
    handleSelectAddress,
    handleEditAddress
}: Props) {
    const fullAddress = getAddressDetail(address);

    return (
        <ReanimatedSwipeable
            enabled
            friction={3}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            renderRightActions={(progress, drag) => (
                <RightAction
                    drag={drag}
                    isDefault={address.isDefault}
                    handleSetDefault={handleSetDefault}
                    handleDeleteAddress={handleDeleteAddress}
                />
            )}
        >
            <TouchableOpacity
                style={[styles.contentContainer, styles.contentWrapper]}
                onPress={handleSelectAddress}
            >
                <View style={styles.iconWrapper}>
                    <Image source={require('@/../assets/icons/address_icon.png')} style={styles.icon} />
                </View>
                <View style={styles.col}>
                    <View style={styles.contentWrapper}>
                        <Text style={styles.name}>
                            {address.fullName}
                        </Text>
                        <Text style={styles.phone}>
                            {address.phone}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.address}>
                            {fullAddress}
                        </Text>
                    </View>
                    <View style={[styles.contentWrapper]}>
                        <Tag isDefault={address.isDefault} />
                        <Pressable
                            onPress={(e) => {
                                e.stopPropagation();
                                handleEditAddress();
                            }}
                            onStartShouldSetResponder={() => true}
                            style={styles.buttonLink}
                        >
                            <Text style={styles.buttonLabel}>
                                Chỉnh sửa
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableOpacity>
        </ReanimatedSwipeable>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 14,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    col: {
        flexShrink: 1,
        rowGap: 6,
        flexGrow: 1
    },
    iconWrapper: {
        height: '100%',
        alignItems: 'flex-start'
    },
    icon: {
        height: 40,
        aspectRatio: 1,
    },
    name: {
        fontWeight: "700",
        letterSpacing: 0.5
    },
    phone: {
        color: "#5c5e5fff",
        letterSpacing: 0.5
    },
    address: {
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: 0.2,
    },
    buttonLink: {
        marginLeft: 'auto',
        paddingVertical: 3,
        paddingHorizontal: 6,
        zIndex: 1,
    },
    buttonLabel: {
        color: '#006340',
        fontWeight: '500',
    },
    tagWrapper: {
        borderWidth: 1,
        borderColor: "#C21E0C",
        borderRadius: 4,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    tag: {
        color: "#C21E0C",
        fontSize: 11,
        fontWeight: "500",
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
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starButton: {
        width: 80,
        backgroundColor: '#FFFFFF',
    },
    deleteButton: {
        width: 80,
        overflow: 'hidden',
        backgroundColor: '#C21E0C',
    },
    sideActionWrapper: {
    },
});
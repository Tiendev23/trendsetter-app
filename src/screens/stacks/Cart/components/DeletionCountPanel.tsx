import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/components/buttons/CustomButton';
import { ObjectId } from '@/types';
import { showInfoToast } from '@/utils/toast';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
    invisible: boolean;
    checkedIds: ObjectId[];
    isCheckedAll: boolean;
    onCheckedAll: () => void;
    onDeleting: () => void;
};

export default function DeletionCountPanel({ invisible, checkedIds, isCheckedAll, onCheckedAll, onDeleting }: Props) {
    if (invisible) return null;
    const buttonStyle = isCheckedAll ? styles.checked : styles.unchecked;

    const DeletionHandler = () => {
        if (checkedIds.length == 0) return null;
        return (
            <View style={styles.wrapper}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.label}>Số sản phẩm đã chọn</Text>
                    <Text style={[styles.label, styles.count]}>
                        {checkedIds.length}
                    </Text>
                </View>
                <CustomButton
                    title='Xoá sản phẩm'
                    onPress={onDeleting}
                    theme='red'
                />
            </View>
        )
    }

    return (
        <View style={[styles.container, styles.wrapper]}>
            <View style={styles.contentWrapper}>
                <View style={[styles.contentWrapper, styles.checkButtonWrapper]}>
                    <TouchableOpacity
                        style={styles.contentWrapper}
                        onPress={onCheckedAll}
                    >
                        <View
                            style={[styles.checkButton, buttonStyle]}
                        >
                            <FontAwesome5 name="check" size={15}
                                color="#FFFFFF" />
                        </View>
                        <Text style={styles.label}>Chọn tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.contentWrapper]}>
                    <TouchableOpacity
                        style={[styles.favSaveButton, { opacity: 0.5 }]}
                        onPress={() => {
                            showInfoToast({
                                title: "Thông báo",
                                message: "Tính năng đang được phát triển"
                            })
                        }}
                    >
                        <Text style={styles.buttonLabel}>Lưu vào Yêu thích</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <DeletionHandler />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 30,
        padding: 20,
    },
    wrapper: {
        gap: 20,
    },
    contentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 1,
        columnGap: 12,
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    count: {
        color: '#C21E0C'
    },
    checkButton: {
        borderWidth: 1,
        height: 30,
        aspectRatio: 1,
        borderRadius: 5,
        borderColor: '#C21E0C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkButtonWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: 12
    },
    checked: {
        backgroundColor: '#C21E0C'
    },
    unchecked: {
        backgroundColor: '#FFFFFF'
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
        color: "#006340",
        letterSpacing: 0.2
    },
    favSaveButton: {
        borderColor: "#006340",
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    },
});
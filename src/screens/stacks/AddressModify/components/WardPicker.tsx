import { getWardsByProvince } from '@/services/location.service';
import { Ward } from '@/types';
import { showErrorToast } from '@/utils/toast';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {
    defaultWard?: Ward | undefined;
    valueHook: [string | null, React.Dispatch<React.SetStateAction<string | null>>]
    provinceCode: string | null;
    onWardPick: (ward: Ward) => void;
}
export default function WardPicker({ defaultWard, provinceCode, valueHook, onWardPick }: Props) {
    const wards = useMemo(() => getWardsByProvince(provinceCode), [provinceCode]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = valueHook;

    useEffect(() => {
        if (defaultWard) onWardPick(defaultWard);
    }, [])

    return (
        <Pressable onPress={() => {
            if (!provinceCode) showErrorToast({ title: "Vui lòng chọn tỉnh / thành phố" })
        }}>
            <DropDownPicker
                disabled={!provinceCode}
                open={open}
                setOpen={setOpen}
                items={wards.map((w) => ({
                    label: `${w.wardCode} - ${w.name}`,
                    value: w.wardCode,
                })).sort((a, b) => Number(a.value) - Number(b.value))}
                value={value}
                setValue={setValue}
                searchable={true}
                searchPlaceholder="Nhập tên phường / xã"
                placeholder="-- Chọn phường / xã --"
                listMode="MODAL"
                onChangeValue={(val) => {
                    setValue(val);
                    const item = wards.find((w) => w.wardCode === val);
                    if (item) onWardPick(item);
                }}
                style={styles.container}
                showTickIcon={false}
                searchContainerStyle={styles.searchContainer}
                searchTextInputStyle={styles.searchTextInput}
                selectedItemLabelStyle={styles.selectedItemLabel}
                selectedItemContainerStyle={styles.selectedItemContainer}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#cccccc',
        borderRadius: 8,
        marginVertical: 5
    },
    searchContainer: {
        height: 65,
        borderColor: '#A0A0A0',
    },
    searchTextInput: {
        height: 40,
        borderColor: '#A0A0A0',
    },
    selectedItemLabel: {
        color: "#006340",
        fontWeight: 'bold'
    },
    selectedItemContainer: {
        backgroundColor: "rgba(0, 99, 64, 0.2)",
    },
})
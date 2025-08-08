import { getProvinces } from '@/services/location.service';
import { ProvinceLite } from '@/types';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {
    onProvPick: (prov: ProvinceLite) => void;
    valueHook: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
}
const provinces = getProvinces();
export default function ProvincePicker({ onProvPick, valueHook }: Props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = valueHook;

    return (
        <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={provinces.map((p) => ({
                label: `${p.provinceCode} - ${p.name}`,
                value: p.provinceCode,
            }))}
            value={value}
            setValue={setValue}
            searchable={true}
            searchPlaceholder="Nhập tên tỉnh / thành phố"
            placeholder="-- Chọn tỉnh / thành phố --"
            listMode="MODAL"
            onChangeValue={(val) => {
                setValue(val);
                const item = provinces.find((i) => i.provinceCode === val);
                if (item) onProvPick(item);
            }}
            style={styles.container}
            showTickIcon={false}
            searchContainerStyle={styles.searchContainer}
            searchTextInputStyle={styles.searchTextInput}
            selectedItemLabelStyle={styles.selectedItemLabel}
            selectedItemContainerStyle={styles.selectedItemContainer}
        />
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
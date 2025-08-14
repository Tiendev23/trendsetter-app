import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AddressCard, LabelValueBox } from '../EditAddressScreen';
import AutoCompleteSelect from './AutoCompleteSelect';
import { styles as Styles } from '../../Account/AddressListScreen';
import ScreenHeader from '../../../../components/ScreenHeader';
import { useFocusEffect } from '@react-navigation/native';
import { AddressContext } from '../../../../contexts/AddressContext';

import locations from '../../../../data/locations.json';

const LocationScreen = ({ navigation, route }:{navigation:any,route:any}) => {
  const {
    provinces, setProvinces,
    wards, setWards,
    selectedProvince, setSelectedProvince,
    selectedWard, setSelectedWard,
  } = useContext(AddressContext)!;

  const isLocationValid = selectedProvince && selectedWard;
  const [street, setStreet] = useState('');

  useEffect(() => {
    const provinceList = locations.map((prov) => ({
      name: prov.name,
      code: prov.provinceCode
    }));
    setProvinces(provinceList);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const province = locations.find(p => p.provinceCode === selectedProvince.code);
      const wardList = province?.wards?.map((w) => ({
        name: w.name,
        code: w.wardCode
      })) || [];
      setWards(wardList);
      setSelectedWard(null);
    }
  }, [selectedProvince]);

  const handleSelectProvince = (province: { code: number; name: string }|null) => {
    setSelectedProvince(province);
    setSelectedWard(null);
  };

  const handleConfirm = () => {
    const locationData = {
      province: selectedProvince?.name || '',
      district: '', // Không còn cấp quận/huyện
      ward: selectedWard?.name || '',
      street: street,
    };
    route.params?.onSelectLocation?.(locationData);
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedProvince(null);
      setStreet('');
      //setProvinces([]);
    }, [])
  );

  return (
    <View>
      <ScreenHeader title='' />
      <AddressCard title="Địa chỉ">
        <AutoCompleteSelect
          label="Tỉnh / Thành phố"
          data={provinces}
          onSelect={handleSelectProvince}
          selectedValue={selectedProvince?.name}
          placeholder="Tìm Tỉnh / Thành phố..."
        />
        <AutoCompleteSelect
          label="Phường / Xã"
          data={wards}
          onSelect={setSelectedWard}
          selectedValue={selectedWard?.name}
          placeholder="Tìm Phường / Xã..."
          disabled={!selectedProvince}
        />
        <LabelValueBox
          label="Tên đường, số nhà"
          value={street}
          onChangeText={setStreet}
        />
        <View style={styles.btn}>
          <TouchableOpacity
            style={[
              Styles.addButton,
              !isLocationValid && { backgroundColor: '#ccc' }
            ]}
            onPress={handleConfirm}
            disabled={!isLocationValid}
          >
            <Text style={Styles.addButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </AddressCard>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
  }
});

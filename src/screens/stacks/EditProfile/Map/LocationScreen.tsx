import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { AddressCard, LabelValueBox } from '../EditAddressScreen';
import { AddressContext } from '../../../../contexts/AddressContext';
import { fetchDistricts, fetchProvinces, fetchWards } from '../../../../redux/features/addresses/locationSlice';
import AutoCompleteSelect from './AutoCompleteSelect';
import { styles as Styles } from '../../Account/AddressListScreen';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../../components/ScreenHeader';
import { useFocusEffect } from '@react-navigation/native';
const LocationScreen = ({ navigation, route }) => {

  const {
    provinces, setProvinces,
    districts, setDistricts,
    wards, setWards,
    selectedProvince, setSelectedProvince,
    selectedDistrict, setSelectedDistrict,
    selectedWard, setSelectedWard
  } = useContext(AddressContext);
  const isLocationValid = selectedProvince && selectedDistrict && selectedWard;

  const {
    provincesOptions,
    districtsOptions,
    wardsOptions,
    loadingProvinces,
    loadingDistricts,
    loadingWards,
    error,
  } = useSelector((state: RootState) => state.location);

  const dispatch = useDispatch<AppDispatch>();

  const [street, setStreet] = useState('');

  useEffect(() => {
    dispatch(fetchProvinces());

  }, [dispatch]);

  //  Khi chọn tỉnh => gọi huyện
  useEffect(() => {
    if (selectedProvince) {
      dispatch(fetchDistricts(selectedProvince.code));

      setSelectedDistrict(null);
      setSelectedWard(null);
    }
  }, [selectedProvince]);

  //  Khi chọn huyện => gọi xã
  useEffect(() => {
    if (selectedDistrict) {
      dispatch(fetchWards(selectedDistrict.code));
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  // Đồng bộ Redux → Context
  useEffect(() => {
    setProvinces(provincesOptions);
  }, [provincesOptions]);

  useEffect(() => {
    setDistricts(districtsOptions);
  }, [districtsOptions]);

  useEffect(() => {
    setWards(wardsOptions);
  }, [wardsOptions]);

  //  Xử lý chọn Tỉnh
  const handleSelectProvince = (province: { code: number; name: string }) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  //  Xử lý chọn Huyện
  const handleSelectDistrict = (district: { code: number; name: string }) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
  };
  const handleConfirm = () => {
    const locationData = {
      city: selectedProvince?.name || '',
      district: selectedDistrict?.name || '',
      ward: selectedWard?.name || '',
      streetDetails: street,
    };

    // Gửi dữ liệu về thông qua callback
    route.params?.onSelectLocation?.(locationData);
    setProvinces(null)
    navigation.goBack();
  };
  // Reset khi vào lại màn hình
  useFocusEffect(
    useCallback(() => {
      // Reset khi mở lại màn
      setSelectedProvince(null);
      setStreet('');
      setProvinces([]);

    }, [])
  );

  return (
    <View>
      <ScreenHeader
        title=''

      />
      <AddressCard title="Địa chỉ">
        {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

        <AutoCompleteSelect
          label="Tỉnh / Thành phố"
          data={provinces}
          onSelect={handleSelectProvince}
          selectedValue={selectedProvince?.name}
          placeholder="Tìm Tỉnh / Thành phố..."
          loading={loadingProvinces}
        />

        <AutoCompleteSelect
          label="Quận / Huyện"
          data={districts}
          onSelect={handleSelectDistrict}
          selectedValue={selectedDistrict?.name}
          placeholder="Tìm Quận / Huyện..."
          disabled={!selectedProvince}
          loading={loadingDistricts}
        />

        <AutoCompleteSelect
          label="Phường / Xã"
          data={wards}
          onSelect={setSelectedWard}
          selectedValue={selectedWard?.name}
          placeholder="Tìm Phường / Xã..."
          disabled={!selectedDistrict}
          loading={loadingWards}
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
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
  },
  btn: {
    padding: 10,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
  }
});

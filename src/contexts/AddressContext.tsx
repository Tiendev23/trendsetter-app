import React, { createContext, ReactNode, useState } from "react";

// Kiểu dữ liệu context
type AddressType = {
  provinces: any[];
  setProvinces: (value: any[]) => void;
  districts: any[];
  setDistricts: (value: any[]) => void;
  wards: any[];
  setWards: (value: any[]) => void;

  selectedProvince: any;
  setSelectedProvince: (value: any) => void;
  selectedDistrict: any;
  setSelectedDistrict: (value: any) => void;
  selectedWard: any;
  setSelectedWard: (value: any) => void;
};

// Tạo context
export const AddressContext = createContext<AddressType | undefined>(undefined);

// Provider bọc App hoặc từng screen
export function AddressProvider({ children }: { children: ReactNode }) {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);

  const value: AddressType = {
    provinces,
    setProvinces,
    districts,
    setDistricts,
    wards,
    setWards,
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
    selectedWard,
    setSelectedWard
  };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
}

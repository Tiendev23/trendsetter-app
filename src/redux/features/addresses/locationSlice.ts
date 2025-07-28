import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Base_URL = `https://provinces.open-api.vn/api`;

interface LocationState {
    provincesOptions: any[],
    districtsOptions: any[],
    wardsOptions: any[],
    loadingProvinces: boolean,
    loadingDistricts: boolean,
    loadingWards: boolean,
    error: string | null
}

const initialState: LocationState = {
    provincesOptions: [],
    districtsOptions: [],
    wardsOptions: [],
    loadingProvinces: false,
    loadingDistricts: false,
    loadingWards: false,
    error: null,
    
}

// lấy danh sách tỉnh
export const fetchProvinces = createAsyncThunk(
    "location/fetchProvinces",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${Base_URL}/p/`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// lấy danh sách huyện theo tỉnh
export const fetchDistricts = createAsyncThunk(
    "location/fetchDistricts",
    async (provinceCode: string, { rejectWithValue }) => {        
        try {
            const res = await axios.get(`${Base_URL}/p/${provinceCode}?depth=2`);
            return res.data.districts; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// lấy danh sách xã theo huyện
export const fetchWards = createAsyncThunk(
    "location/fetchWards",
    async (districtCode: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${Base_URL}/d/${districtCode}?depth=2`);
            return res.data.wards; // ⚠️ lấy wards từ response
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const LocationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Tỉnh
            .addCase(fetchProvinces.pending, (state) => {
                state.loadingProvinces = true;
            })
            .addCase(fetchProvinces.fulfilled, (state, action) => {
                state.loadingProvinces = false;
                state.provincesOptions = action.payload;
            })
            .addCase(fetchProvinces.rejected, (state, action) => {
                state.loadingProvinces = false;
                state.error = action.payload as string;
            })

            // Huyện
            .addCase(fetchDistricts.pending, (state) => {
                state.loadingDistricts = true;
            })
            .addCase(fetchDistricts.fulfilled, (state, action) => {
                state.loadingDistricts = false;
                state.districtsOptions = action.payload;
            })
            .addCase(fetchDistricts.rejected, (state, action) => {
                state.loadingDistricts = false;
                state.error = action.payload as string;
            })

            // Xã
            .addCase(fetchWards.pending, (state) => {
                state.loadingWards = true;
            })
            .addCase(fetchWards.fulfilled, (state, action) => {
                state.loadingWards = false;
                state.wardsOptions = action.payload;
            })
            .addCase(fetchWards.rejected, (state, action) => {
                state.loadingWards = false;
                state.error = action.payload as string;
            });
    },
});

export default LocationSlice.reducer;

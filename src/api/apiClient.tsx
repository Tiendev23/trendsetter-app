import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { showSuccessToast } from '../utils/toast';

const API_URL = 'https://trendsetter-backend.onrender.com/api';
/** localhost:5000 cho máy ảo
 *  <IPv4 Address>:5000 khi chạy máy thật
 */

// const API_URL = 'https://31447356712e.ngrok-free.app/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// xử lý lỗi mạng toàn cục
apiClient.interceptors.response.use(
    res => res,
    err => {
        if (!err.response) {
            console.error("⚠️ Không thể kết nối đến server. Kiểm tra lại API_URL hoặc trạng thái server.");
            // showToast(
            //     "Error"
            //     "Mất kết nối máy chủ",
            //     "Vui lòng kiểm tra mạng hoặc địa chỉ IP cấu hình"
            // )
        }
        return Promise.reject(err);
    }
);


// Thêm token vào request nếu có
apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token'); // hoặc AsyncStorage trong React Native
    if (token) {

        config.headers.Authorization = `Bearer ${token}`;


    }
    return config;
});

export default apiClient;
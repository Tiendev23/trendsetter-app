import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const API_URL = 'https://trendsetter-backend.onrender.com/api';
/** localhost:5000 cho máy ảo
 *  <IPv4 Address>:5000 khi chạy máy thật
 */

const API_URL = 'http://192.168.0.3:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm token vào request nếu có
apiClient.interceptors.request.use((config) => {
    const token = AsyncStorage.getItem('token'); // hoặc AsyncStorage trong React Native
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
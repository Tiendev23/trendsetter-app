import axios from 'axios';
import * as Storage from '@/services/asyncStorage.service';

//const API_URL = 'https://trendsetter-backend.onrender.com/api';
 const API_URL = 'http://172.16.116.44:5000/api';

/** localhost:5000 cho máy ảo
 *  <IPv4 Address>:5000 khi chạy máy thật
 */

// const API_URL = 'https://baeeb75b68e3.ngrok-free.app/api';

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
    const token = await Storage.getItem('@token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export default apiClient;
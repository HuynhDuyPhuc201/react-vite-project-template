import axios from 'axios';
import { getToken, setToken } from '../core/token';
import authService from '../services/authService';

// axios.defaults.baseURL = import.meta.env.VITE_API_HOST;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_HOST, // import theo kiểu vite
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
});

let promiseRefreshToken = null;

// lấy data từ giá trị trả về -> rút ngắn data của axios
api.interceptors.response.use(
    (res) => {
        return res.data;
    },

    async (err) => {
        const response = err.response.data;

        console.log(response.error_code);

        // ktra xem token có bị hêt hạn hay kh? nếu hết hạn thì refresh token mới
        if (response.error_code === 'TOKEN_EXPIRED') {
            if (promiseRefreshToken) {
                await promiseRefreshToken;
            } else {
                const token = getToken();
                promiseRefreshToken = authService.refreshToken({ refreshToken: token.refreshToken });
                const accessToken = await promiseRefreshToken;
                token.accessToken = accessToken.data.accessToken;
                setToken(token);
            }
            promiseRefreshToken = null;
            return api(err.config);
        }
        throw err.response.data;
    },
    // hàm trả về lỗi
    (err) => {
        throw err.response.data;
    },
);

export default api;

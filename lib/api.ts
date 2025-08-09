// lib/api.ts
import axios from 'axios';
import Constants from 'expo-constants';
import { tokenStore } from './token';

const extra = Constants.expoConfig?.extra as { apiUrl?: string; ENV?: string };
const baseURL = extra?.apiUrl;

if (!baseURL) {
    throw new Error('API base URL not configured. Check app.config.ts extra.apiUrl');
}

export const api = axios.create({
    baseURL,
    timeout: 15000,
});

// Don’t attach Authorization to /auth/* routes
api.interceptors.request.use(async (config) => {
    const isAuthRoute = config.url?.startsWith('/auth/');
    if (!isAuthRoute) {
        const token = await tokenStore.get();
        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any).Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (r) => r,
    (err) => {
        const status = err.response?.status;
        let msg =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            'Request failed';
        if (status === 409) msg = 'Username already exists.';
        if (status === 401) msg = 'Unauthorized. Please sign in.';
        return Promise.reject(new Error(msg));
    }
);

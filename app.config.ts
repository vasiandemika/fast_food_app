// app.config.ts
import { ExpoConfig } from '@expo/config';

const ENV = process.env.APP_ENV ?? 'development'; // development | staging | production

const ENV_MAP: Record<string, { apiUrl: string }> = {
    development: { apiUrl: 'http://10.0.2.2:8080' },                  // Android emulator
    staging:     { apiUrl: 'https://staging.api.yourdomain.com' },
    production:  { apiUrl: 'https://api.yourdomain.com' },
};

const config: ExpoConfig = {
    name: 'FastFood',
    slug: 'fast-food',
    scheme: 'fastfood',
    extra: {
        ENV,
        apiUrl: process.env.EXPO_PUBLIC_API_URL || ENV_MAP[ENV].apiUrl,
    },
};

export default config;

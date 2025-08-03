// baseUrl.ts
const BASE_URL_DEV = 'http://localhost:4000/api';
// const BASE_URL_PROD = 'https://api.covoitivoire.com/api';
export const getBaseUrl = (): string => {
    return BASE_URL_DEV;
};

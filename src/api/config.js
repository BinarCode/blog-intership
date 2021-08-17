let API_HOST = 'https://api-internship.binarcode.com';

if (process.env.VUE_APP_API_URL) {
    API_HOST = process.env.VUE_APP_API_URL
}

export default {
    API_HOST: API_HOST,
};
import 'dotenv/config';

export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL,
};


const requiredInProd = ['MONGO_URI', 'JWT_SECRET', 'RESEND_API_KEY', 'EMAIL_FROM'];

if (ENV.NODE_ENV === 'production') {
    const missing = requiredInProd.filter(k => !ENV[k]);

    if (missing.length) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}
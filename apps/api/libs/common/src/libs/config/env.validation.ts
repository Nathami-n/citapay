import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'staging').default('development'),
    PORT: Joi.number().default(5002),
    APP_NAME: Joi.string().default('CITAPAY API'),
    LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error').default('debug'),

    DATABASE_URL: Joi.string().required(),

    // MPESA Configuration
    MPESA_CONSUMER_KEY: Joi.string().required(),
    MPESA_CONSUMER_SECRET: Joi.string().required(),
    MPESA_SHORT_CODE: Joi.string().required(),
    MPESA_PASSKEY: Joi.string().required(),
    MPESA_ENVIRONMENT: Joi.string().valid('sandbox', 'production').default('sandbox'),
    MPESA_CALLBACK_URL: Joi.string().uri().required(),

    // JWT Configuration
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().default('1h'),
    JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),

    // Google OAuth (optional - only required if using Google auth)
    GOOGLE_CLIENT_ID: Joi.string().optional(),
    GOOGLE_CLIENT_SECRET: Joi.string().optional(),
    GOOGLE_CALLBACK_URL: Joi.string().uri().optional(),

    // Frontend URL for OAuth redirects
    FRONTEND_URL: Joi.string().uri().default('http://localhost:3000'),

    // Redis (optional)
    REDIS_URL: Joi.string().uri().optional(),

    // Rate Limiting (optional - has defaults in throttler module)
    THROTTLE_SHORT_TTL: Joi.number().default(1000),
    THROTTLE_SHORT_LIMIT: Joi.number().default(3),
    THROTTLE_MEDIUM_TTL: Joi.number().default(10000),
    THROTTLE_MEDIUM_LIMIT: Joi.number().default(20),
    THROTTLE_LONG_TTL: Joi.number().default(60000),
    THROTTLE_LONG_LIMIT: Joi.number().default(100),
});

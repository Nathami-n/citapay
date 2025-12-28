import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'staging').default('development'),
    PORT: Joi.number().default(5002),
    APP_NAME: Joi.string().default('CITAPAY API'),
    LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error').default('debug'),

    DATABASE_URL: Joi.string().required(),

    MPESA_CONSUMER_KEY: Joi.string().required(),
    MPESA_CONSUMER_SECRET: Joi.string().required(),
    MPESA_SHORT_CODE: Joi.string().required(),
    MPESA_PASSKEY: Joi.string().required(),
    MPESA_ENVIRONMENT: Joi.string().valid('sandbox', 'production').default('sandbox'),
    MPESA_CALLBACK_URL: Joi.string().uri().required(),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().default('1h'),

    REDIS_URL: Joi.string().uri().optional(),
});

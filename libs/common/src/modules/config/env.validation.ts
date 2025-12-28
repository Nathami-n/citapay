import * as Joi from "joi";

export const envValidationSchema = Joi.object({
    DATABASE_URL: Joi.string().required(),
    PORT: Joi.number().default(5002),
    MPESA_CONSUMER_KEY: Joi.string().required(),
    MPESA_CONSUMER_SECRET: Joi.string().required(),
    MPESA_SHORT_CODE: Joi.string().required(),
    MPESA_PASSKEY: Joi.string().required(),
    MPESA_ENVIRONMENT: Joi.string().valid("sandbox", "production").default("sandbox"),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().default("1h"),
    
})
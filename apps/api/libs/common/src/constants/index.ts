/**
 * Global constants and enums for the application.
 * 
 * NOTE: For database-related enums (UserRole, AuthProviderType, MerchantStatus, etc.),
 * use the ones exported from @prisma/client to ensure type safety with the database.
 */

// ============================================
// AUTH CONSTANTS
// ============================================

export const AUTH_STRATEGIES = {
    LOCAL: "local",
    JWT: "jwt",
    GOOGLE: "google",
} as const;

export type AuthStrategy = typeof AUTH_STRATEGIES[keyof typeof AUTH_STRATEGIES];

// ============================================
// PASSPORT FIELD NAMES
// ============================================

export const PASSPORT_FIELDS = {
    USERNAME: "email", // Field used for local strategy username
} as const;

// ============================================
// OAUTH SCOPES
// ============================================

export const GOOGLE_OAUTH_SCOPES = ["email", "profile"] as const;

// ============================================
// COOKIE NAMES
// ============================================

export const COOKIE_NAMES = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
} as const;

// ============================================
// API KEY PREFIXES
// ============================================

export const API_KEY_PREFIXES = {
    LIVE: "pk_live_",
    TEST: "pk_test_",
} as const;

// ============================================
// WEBHOOK EVENTS
// ============================================

export const WEBHOOK_EVENTS = {
    PAYMENT_COMPLETED: "payment.completed",
    PAYMENT_FAILED: "payment.failed",
    PAYMENT_PENDING: "payment.pending",
    PAYOUT_COMPLETED: "payout.completed",
    PAYOUT_FAILED: "payout.failed",
} as const;

export type WebhookEvent = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS];

// ============================================
// AUDIT LOG ACTIONS
// ============================================

export const AUDIT_ACTIONS = {
    // Auth
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SIGNUP: "SIGNUP",
    PASSWORD_RESET: "PASSWORD_RESET",
    PASSWORD_CHANGED: "PASSWORD_CHANGED",
    EMAIL_VERIFIED: "EMAIL_VERIFIED",
    TWO_FACTOR_ENABLED: "TWO_FACTOR_ENABLED",
    TWO_FACTOR_DISABLED: "TWO_FACTOR_DISABLED",

    // API Keys
    API_KEY_CREATED: "API_KEY_CREATED",
    API_KEY_REVOKED: "API_KEY_REVOKED",

    // Merchant
    MERCHANT_CREATED: "MERCHANT_CREATED",
    MERCHANT_UPDATED: "MERCHANT_UPDATED",
    MERCHANT_APPROVED: "MERCHANT_APPROVED",
    MERCHANT_SUSPENDED: "MERCHANT_SUSPENDED",

    // Payments
    PAYMENT_INITIATED: "PAYMENT_INITIATED",
    PAYMENT_COMPLETED: "PAYMENT_COMPLETED",
    PAYMENT_FAILED: "PAYMENT_FAILED",
    PAYOUT_INITIATED: "PAYOUT_INITIATED",
    PAYOUT_COMPLETED: "PAYOUT_COMPLETED",
    PAYOUT_FAILED: "PAYOUT_FAILED",
} as const;

export type AuditAction = typeof AUDIT_ACTIONS[keyof typeof AUDIT_ACTIONS];

// ============================================
// RESOURCE TYPES (for audit logs)
// ============================================

export const RESOURCE_TYPES = {
    USER: "user",
    SESSION: "session",
    MERCHANT: "merchant",
    API_KEY: "api_key",
    TRANSACTION: "transaction",
    WEBHOOK: "webhook",
} as const;

export type ResourceType = typeof RESOURCE_TYPES[keyof typeof RESOURCE_TYPES];

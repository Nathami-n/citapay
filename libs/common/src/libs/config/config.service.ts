import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private config: ConfigService) { }

    // Generic getter for any config value
    get<T = string>(key: string): T | undefined {
        return this.config.get<T>(key);
    }

    // ============================================
    // APP CONFIG
    // ============================================

    get nodeEnv(): string {
        return this.config.get<string>("NODE_ENV", "development");
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === "development";
    }

    get isProduction(): boolean {
        return this.nodeEnv === "production";
    }

    get port(): number {
        return this.config.get<number>("PORT", 5002);
    }

    get appName(): string {
        return this.config.get<string>("APP_NAME", "CITAPAY API");
    }

    get logLevel(): string {
        return this.config.get<string>("LOG_LEVEL", "debug");
    }

    get frontendUrl(): string {
        return this.config.get<string>("FRONTEND_URL", "http://localhost:3000");
    }

    // ============================================
    // DATABASE
    // ============================================

    get databaseUrl(): string {
        return this.config.getOrThrow<string>("DATABASE_URL");
    }

    // ============================================
    // JWT CONFIG
    // ============================================

    get jwtSecret(): string {
        return this.config.getOrThrow<string>("JWT_SECRET");
    }

    get jwtExpiration(): number {
        return this.config.get<number>("JWT_EXPIRATION", 3600); // 1 hour in seconds
    }

    get jwtRefreshExpiration(): number {
        return this.config.get<number>("JWT_REFRESH_EXPIRATION", 604800); // 7 days in seconds
    }

    get jwtRefreshExpirationDays(): number {
        // Convert seconds to days
        return Math.floor(this.jwtRefreshExpiration / 86400);
    }

    get jwtRefreshExpirationMs(): number {
        // Convert seconds to milliseconds
        return this.jwtRefreshExpiration * 1000;
    }

    // ============================================
    // GOOGLE OAUTH
    // ============================================

    get googleClientId(): string | undefined {
        return this.config.get<string>("GOOGLE_CLIENT_ID");
    }

    get googleClientSecret(): string | undefined {
        return this.config.get<string>("GOOGLE_CLIENT_SECRET");
    }

    get googleCallbackUrl(): string | undefined {
        return this.config.get<string>("GOOGLE_CALLBACK_URL");
    }

    get isGoogleOAuthConfigured(): boolean {
        return !!(this.googleClientId && this.googleClientSecret && this.googleCallbackUrl);
    }

    // ============================================
    // MPESA CONFIG
    // ============================================

    get mpesaConsumerKey(): string {
        return this.config.getOrThrow<string>("MPESA_CONSUMER_KEY");
    }

    get mpesaConsumerSecret(): string {
        return this.config.getOrThrow<string>("MPESA_CONSUMER_SECRET");
    }

    get mpesaShortCode(): string {
        return this.config.getOrThrow<string>("MPESA_SHORT_CODE");
    }

    get mpesaPasskey(): string {
        return this.config.getOrThrow<string>("MPESA_PASSKEY");
    }

    get mpesaEnvironment(): "sandbox" | "production" {
        return this.config.get<"sandbox" | "production">("MPESA_ENVIRONMENT", "sandbox");
    }

    get mpesaCallbackUrl(): string {
        return this.config.getOrThrow<string>("MPESA_CALLBACK_URL");
    }

    get isMpesaSandbox(): boolean {
        return this.mpesaEnvironment === "sandbox";
    }

    // ============================================
    // REDIS
    // ============================================

    get redisUrl(): string | undefined {
        return this.config.get<string>("REDIS_URL");
    }

    // ============================================
    // THROTTLING
    // ============================================

    get throttleShortTtl(): number {
        return this.config.get<number>("THROTTLE_SHORT_TTL", 1000);
    }

    get throttleShortLimit(): number {
        return this.config.get<number>("THROTTLE_SHORT_LIMIT", 3);
    }

    get throttleMediumTtl(): number {
        return this.config.get<number>("THROTTLE_MEDIUM_TTL", 10000);
    }

    get throttleMediumLimit(): number {
        return this.config.get<number>("THROTTLE_MEDIUM_LIMIT", 20);
    }

    get throttleLongTtl(): number {
        return this.config.get<number>("THROTTLE_LONG_TTL", 60000);
    }

    get throttleLongLimit(): number {
        return this.config.get<number>("THROTTLE_LONG_LIMIT", 100);
    }

    // ============================================
    // GROUPED CONFIGS (for convenience)
    // ============================================

    get mpesaConfig() {
        return {
            consumerKey: this.mpesaConsumerKey,
            consumerSecret: this.mpesaConsumerSecret,
            shortCode: this.mpesaShortCode,
            passKey: this.mpesaPasskey,
            environment: this.mpesaEnvironment,
            callbackUrl: this.mpesaCallbackUrl,
            isSandbox: this.isMpesaSandbox,
        };
    }

    get jwtConfig() {
        return {
            secret: this.jwtSecret,
            expiration: this.jwtExpiration,
            refreshExpiration: this.jwtRefreshExpiration,
            refreshExpirationDays: this.jwtRefreshExpirationDays,
            refreshExpirationMs: this.jwtRefreshExpirationMs,
        };
    }

    get googleOAuthConfig() {
        return {
            clientId: this.googleClientId,
            clientSecret: this.googleClientSecret,
            callbackUrl: this.googleCallbackUrl,
            isConfigured: this.isGoogleOAuthConfigured,
        };
    }

    get throttleConfig() {
        return {
            short: { ttl: this.throttleShortTtl, limit: this.throttleShortLimit },
            medium: { ttl: this.throttleMediumTtl, limit: this.throttleMediumLimit },
            long: { ttl: this.throttleLongTtl, limit: this.throttleLongLimit },
        };
    }
}

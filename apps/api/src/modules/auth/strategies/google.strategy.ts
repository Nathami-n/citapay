import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AppConfigService } from "@app/common";
import { AuthService } from "@api/modules/auth/services";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        private config: AppConfigService,
        private authService: AuthService
    ) {
        const { clientId, clientSecret, callbackUrl, isConfigured } = config.googleOAuthConfig;

        if (!isConfigured || !clientId || !clientSecret || !callbackUrl) {
            throw new Error("Google OAuth configuration is incomplete");
        }

        super({
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: callbackUrl,
            scope: ["email", "profile"],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const user = await this.authService.validateGoogleUser(profile);
        done(null, user);
    }
}

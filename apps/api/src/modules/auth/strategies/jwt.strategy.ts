import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AppConfigService, PrismaService } from "@app/common";
import { AuthUserPayload } from "@app/common/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config: AppConfigService,
        private prisma: PrismaService
    ) {
        const secret = config.jwtSecret;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in configuration");
        }

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.access_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: AuthUserPayload) {
        // Check if session still exists and is not revoked
        const session = await this.prisma.session.findUnique({
            where: { id: payload.sessionId },
        });

        if (!session || session.isRevoked) {
            throw new UnauthorizedException("Session has been revoked");
        }

        return {
            id: payload.userId,
            email: payload.email,
            role: payload.role,
            sessionId: payload.sessionId,
        };
    }
}

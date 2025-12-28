import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthUserPayload } from "@app/common/types/auth.types";
import { PrismaService } from "@app/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService
    ) {
        const secret = configService.get<string>("JWT_SECRET");
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

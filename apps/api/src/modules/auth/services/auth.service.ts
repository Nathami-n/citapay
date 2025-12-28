import { AppConfigService, PrismaService } from "@app/common";
import { AuthUserPayload } from "@app/common/types";
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthProviderType, User, UserRole } from "@prisma/client";
import { EmailSignupDto } from "@api/modules/auth/dto";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly config: AppConfigService
    ) { }

    async signup(dto: EmailSignupDto): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name,
                role: UserRole.USER,
            },
        });
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user && user.password && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any, deviceInfo: { ip?: string; userAgent?: string }) {
        const sessionId = uuidv4();
        const refreshToken = uuidv4();
        const expiresAt = new Date(Date.now() + this.config.jwtRefreshExpirationMs);

        await this.prisma.session.create({
            data: {
                id: sessionId,
                refreshToken,
                userId: user.id,
                ipAddress: deviceInfo.ip,
                userAgent: deviceInfo.userAgent,
                expiresAt,
            },
        });

        return this.generateTokens(user, sessionId, refreshToken);
    }

    async refresh(oldRefreshToken: string, deviceInfo: { ip?: string; userAgent?: string }) {
        const session = await this.prisma.session.findUnique({
            where: { refreshToken: oldRefreshToken },
            include: { user: true },
        });

        if (!session || session.isRevoked || session.expiresAt < new Date()) {
            if (session) {
                // Potential reuse attack - revoke family
                await this.revokeSessionFamily(session.userId);
            }
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        // Rotate tokens
        const newSessionId = uuidv4();
        const newRefreshToken = uuidv4();
        const expiresAt = new Date(Date.now() + this.config.jwtRefreshExpirationMs);

        await this.prisma.$transaction([
            this.prisma.session.update({
                where: { id: session.id },
                data: {
                    isRevoked: true,
                    replacedBy: newSessionId,
                },
            }),
            this.prisma.session.create({
                data: {
                    id: newSessionId,
                    refreshToken: newRefreshToken,
                    userId: session.userId,
                    ipAddress: deviceInfo.ip,
                    userAgent: deviceInfo.userAgent,
                    expiresAt,
                },
            }),
        ]);

        return this.generateTokens(session.user, newSessionId, newRefreshToken);
    }

    async logout(refreshToken: string) {
        await this.prisma.session.updateMany({
            where: { refreshToken },
            data: { isRevoked: true },
        });
    }

    private async generateTokens(user: any, sessionId: string, refreshToken: string) {
        const payload: AuthUserPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            sessionId: sessionId,
        };

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: this.config.jwtSecret,
                expiresIn: this.config.jwtExpiration
            }),
            refreshToken,
        };
    }

    private async revokeSessionFamily(userId: string) {
        await this.prisma.session.updateMany({
            where: { userId },
            data: { isRevoked: true },
        });
    }

    async validateGoogleUser(profile: any) {
        const { id, emails, displayName } = profile;
        const email = emails[0].value;

        let user = await this.prisma.user.findUnique({
            where: { email },
            include: { authProviders: true }
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email,
                    name: displayName,
                    role: UserRole.USER,
                    authProviders: {
                        create: {
                            type: AuthProviderType.GOOGLE,
                            providerId: id
                        }
                    }
                },
                include: { authProviders: true }
            });
        } else {
            const hasGoogle = user.authProviders.find(p => p.type === AuthProviderType.GOOGLE);
            if (!hasGoogle) {
                await this.prisma.authProvider.create({
                    data: {
                        type: AuthProviderType.GOOGLE,
                        providerId: id,
                        userId: user.id
                    }
                });
            }
        }

        return user;
    }
}

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { RolesGuard } from "./guards/roles.guard";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: { expiresIn: "1h" },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        GoogleStrategy,
        RolesGuard,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
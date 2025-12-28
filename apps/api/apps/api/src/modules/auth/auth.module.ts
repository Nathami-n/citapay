import { Module } from "@nestjs/common";
import { JwtModule, JwtSignOptions } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppConfigService } from "@app/common";
import { AuthService } from "apps/api/src/modules/auth/services";
import { AuthController } from "apps/api/src/modules/auth/controllers";
import { LocalStrategy, JwtStrategy, GoogleStrategy } from "apps/api/src/modules/auth/strategies";
import { RolesGuard } from "apps/api/src/modules/auth/guards";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (config: AppConfigService) => ({
                secret: config.jwtSecret,
                signOptions: { expiresIn: config.jwtExpiration } as JwtSignOptions,
            }),
            inject: [AppConfigService],
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
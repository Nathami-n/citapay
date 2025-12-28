import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule as NestThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { AppConfigService } from "@app/common/libs/config";

@Module({
    imports: [
        NestThrottlerModule.forRootAsync({
            useFactory: (config: AppConfigService) => ({
                throttlers: [
                    {
                        name: "short",
                        ttl: config.throttleShortTtl,
                        limit: config.throttleShortLimit,
                    },
                    {
                        name: "medium",
                        ttl: config.throttleMediumTtl,
                        limit: config.throttleMediumLimit,
                    },
                    {
                        name: "long",
                        ttl: config.throttleLongTtl,
                        limit: config.throttleLongLimit,
                    },
                ],
            }),
            inject: [AppConfigService],
        }),
    ],
    exports: [NestThrottlerModule],
})
export class ThrottlerModule {
    /**
     * Use this method to register ThrottlerModule with the global guard.
     * This will apply rate limiting to all routes by default.
     */
    static forRoot() {
        return {
            module: ThrottlerModule,
            providers: [
                {
                    provide: APP_GUARD,
                    useClass: ThrottlerGuard,
                },
            ],
        };
    }
}

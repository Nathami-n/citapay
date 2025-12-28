import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private config: ConfigService) { }

    get(key: string) {
        return this.config.get(key);
    }

    get mpesaConfig() {
        return {
            consumerKey: this.config.get<string>("MPESA_CONSUMER_KEY"),
            consumerSecret: this.config.get<string>("MPESA_CONSUMER_SECRET"),
            shortCode: this.config.get<string>("MPESA_SHORT_CODE"),
            passKey: this.config.get<string>("MPESA_PASSKEY"),
            environment: this.config.get<string>("MPESA_ENVIRONMENT"),
        };
    }

    get jwtConfig() {
        return {
            secret: this.config.get<string>("JWT_SECRET"),
            expiration: this.config.get<string>("JWT_EXPIRATION"),
        };
    }

    get databaseConfig() {
        return {
            url: this.config.get<string>("DATABASE_URL"),
        };
    }

    get port() {
        return this.config.get<number>("PORT");
    }
}
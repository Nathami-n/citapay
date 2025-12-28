import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envValidationSchema } from "./env.validation";


@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: envValidationSchema,
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            expandVariables: true,
        })
    ]
})

export class SharedConfigModule { }
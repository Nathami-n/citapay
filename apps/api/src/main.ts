import { AppConfigService, LoggerService } from '@app/common';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);


  const configService = app.get(AppConfigService);
  const logger = app.get(LoggerService);

  const port = configService.port || 3000;
  app.useLogger(logger);

  app.use(helmet());

  app.enableCors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // parse cookies
  app.use(cookieParser());

  // Global validation pipe for DTOs

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  // Set global prefix and enable versioning
  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  const config = new DocumentBuilder()
    .setTitle("Citapay API")
    .setDescription("Citapay API documentation")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  await app.listen(port);

  logger.log(`API running on: http://localhost:${port}/api/v1`);
  logger.log(`Swagger running on: http://localhost:${port}/api/docs`);
}
bootstrap();

import {
  AuthModule,
  MerchantsModule
} from '@api/modules';
import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    MerchantsModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }

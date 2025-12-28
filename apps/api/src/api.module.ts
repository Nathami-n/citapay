import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { MerchantsModule } from '@api/merchants';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    MerchantsModule,
    CommonModule
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }

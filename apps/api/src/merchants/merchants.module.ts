import { Module } from '@nestjs/common';
import { MerchantsController } from '@api/merchants/controllers';
import { MerchantsService } from '@api/merchants/services';

@Module({
  controllers: [MerchantsController],
  providers: [MerchantsService]
})
export class MerchantsModule { }

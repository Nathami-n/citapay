import { Module } from '@nestjs/common';
import { MerchantsController } from '@api/modules/merchants/controllers';
import { MerchantsService } from '@api/modules/merchants/services';

@Module({
  controllers: [MerchantsController],
  providers: [MerchantsService]
})
export class MerchantsModule { }

import { Module } from '@nestjs/common';
import { MerchantsController } from 'apps/api/src/modules/merchants/controllers';
import { MerchantsService } from 'apps/api/src/modules/merchants/services';

@Module({
  controllers: [MerchantsController],
  providers: [MerchantsService]
})
export class MerchantsModule { }

import { PrismaModule, SharedConfigModule, CacheModule, ThrottlerModule } from '@app/common/libs';
import { LoggerService } from '@app/common/services';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    SharedConfigModule,
    PrismaModule,
    CacheModule.forRoot(),
    ThrottlerModule.forRoot(),
  ],
  providers: [
    LoggerService,
  ],
  exports: [
    LoggerService,

    // modules
    SharedConfigModule,
    PrismaModule,
    CacheModule,
    ThrottlerModule,
  ],
})
export class CommonModule { }


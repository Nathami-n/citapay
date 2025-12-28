import { PrismaModule, SharedConfigModule, CacheModule } from '@app/common/libs';
import { LoggerService } from '@app/common/services';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    SharedConfigModule,
    PrismaModule,
    CacheModule.forRoot()
  ],
  providers: [
    LoggerService,
  ],
  exports: [
    LoggerService,

    // modules
    SharedConfigModule,
    PrismaModule,
    CacheModule
  ],
})
export class CommonModule { }

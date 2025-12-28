import { PrismaModule, SharedConfigModule } from '@app/common/libs';
import { LoggerService } from '@app/common/services';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    SharedConfigModule,
    PrismaModule
  ],
  providers: [
    LoggerService,
  ],
  exports: [
    LoggerService,
    
    // modules
    SharedConfigModule,
    PrismaModule
  ],
})
export class CommonModule { }

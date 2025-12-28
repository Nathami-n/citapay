import { Global, Module } from '@nestjs/common';
import { PrismaService, LoggerService } from '@app/common/services';

@Global()
@Module({
  providers: [PrismaService, LoggerService],
  exports: [PrismaService, LoggerService],
})
export class CommonModule { }

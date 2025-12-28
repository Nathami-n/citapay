import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Merchants')
@Controller('merchants')
export class MerchantsController { }

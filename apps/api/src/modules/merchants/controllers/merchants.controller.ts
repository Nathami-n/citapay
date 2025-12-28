import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Merchants')
@Controller({ path: 'merchants', version: '1' })
export class MerchantsController { }

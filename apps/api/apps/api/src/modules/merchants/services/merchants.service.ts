import { LoggerService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MerchantsService {
    constructor(private readonly logger: LoggerService) {
        this.logger.setContext(MerchantsService.name);
    }

    
}

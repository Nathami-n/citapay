import { Injectable, Logger } from "@nestjs/common";


@Injectable()
export class LoggerService {

    private readonly logger = new Logger("CITAPAY");

    constructor(private context?: string) { }

    log(message: string, context?: string) {
        this.logger.log(message, context || this.context);
    }

    error(message: string, trace?: string, context?: string) {
        this.logger.error(message, trace, context || this.context);
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, context || this.context);
    }

    debug(message: string, context?: string) {
        this.logger.debug(message, context || this.context);
    }

    verbose(message: string, context?: string) {
        this.logger.verbose(message, context || this.context);
    }

    setContext(context: string) {
        this.context = context;
    }
}

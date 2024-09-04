import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DiscountService } from './discount.service';

@Injectable()
export class ScheduledTasksDeleteDiscountService {
    constructor(
        private readonly discountService: DiscountService,
    ) { }

    @Cron('0 0 * * *')
    async handleCron() {
        await this.discountService.deleteExpired()
    }
}

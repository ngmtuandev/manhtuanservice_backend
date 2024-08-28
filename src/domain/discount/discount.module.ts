import { Module } from '@nestjs/common';
import { DiscountRepository } from 'src/database/repository';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { ScheduledTasksDeleteDiscountService } from './schedule.task.delete-discount.service';

@Module({
    controllers: [DiscountController],
    providers: [DiscountService, DiscountRepository, ScheduledTasksDeleteDiscountService],
    imports: [],
})
export class DiscountModule { }

import { Module } from '@nestjs/common';
import { OrdersController } from 'src/orders/orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
import { Module } from '@nestjs/common';
import { OrdersController } from 'src/orders/orders.controller';

@Module({
  controllers: [OrdersController],
})
export class OrdersModule {}
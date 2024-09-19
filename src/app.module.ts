import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [OrdersModule],
})
export class AppModule {}
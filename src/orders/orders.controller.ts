import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    const transformedOrder = this.ordersService.transform(createOrderDto);
    return {
      message: '有效的訂單格式',
      order: transformedOrder,
    };
  }
}
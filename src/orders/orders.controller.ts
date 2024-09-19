import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Controller('api/orders')
export class OrdersController {
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    // 這裡可以添加額外的驗證邏輯
    return {
      message: '訂單格式有效',
      order: createOrderDto,
    };
  }
}
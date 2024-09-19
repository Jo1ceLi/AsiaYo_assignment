import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  transform(createOrderDto: CreateOrderDto) {
    const { price, currency } = this.convertCurrency(createOrderDto);
    createOrderDto.price = price;
    createOrderDto.currency = currency;
    return createOrderDto;
  }

  private convertCurrency(dto: Pick<CreateOrderDto, 'price' | 'currency'>): Pick<CreateOrderDto, 'price' | 'currency'> {
    //現實中這邊通常是非同步的從網路上/資料庫獲取匯率，那就會再拆分一個function/service去處理
    const exchageRate = {
      TWD: 1,
      USD: 31,
      //...
    }

    return {
      price: (Number(dto.price) * exchageRate[dto.currency]).toString(),
      currency: 'TWD',
    }
  }
}
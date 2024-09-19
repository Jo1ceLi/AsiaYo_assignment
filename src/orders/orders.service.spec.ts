import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('convertCurrency', () => {
    it('應該將 USD 轉換為 TWD', () => {
      const dto: Pick<CreateOrderDto, 'price' | 'currency'> = {
        price: '100',
        currency: 'USD',
      };

      const result = service['convertCurrency'](dto);

      expect(result).toEqual({
        price: '3100',
        currency: 'TWD',
      });
    });

    it('應該保持 TWD 不變', () => {
      const dto: Pick<CreateOrderDto, 'price' | 'currency'> = {
        price: '1000',
        currency: 'TWD',
      };

      const result = service['convertCurrency'](dto);

      expect(result).toEqual({
        price: '1000',
        currency: 'TWD',
      });
    });
  });
});
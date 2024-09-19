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

  describe('transform', () => {
    it('應該正確轉換貨幣並更新 CreateOrderDto', () => {
      const mockCreateOrderDto: CreateOrderDto = {
        price: '100',
        currency: 'USD',
        id: '1',
        name: 'test',
        address: {
          city: 'test',
          street: 'test',
          district: 'test',
        },
      };

      const result = service.transform(mockCreateOrderDto);

      expect(result.price).toBe('3100');
      expect(result.currency).toBe('TWD');
      expect(result).toBe(mockCreateOrderDto);
    });

    it('當貨幣已經是 TWD 時不應該改變價格', () => {
      const mockCreateOrderDto: CreateOrderDto = {
        price: '1000',
        currency: 'TWD',
        id: '1',
        name: 'test',
        address: {
          city: 'test',
          street: 'test',
          district: 'test',
        },
      };

      const result = service.transform(mockCreateOrderDto);

      expect(result.price).toBe('1000');
      expect(result.currency).toBe('TWD');
      expect(result).toBe(mockCreateOrderDto);
    });
  });
});
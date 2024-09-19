import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            transform: jest.fn().mockImplementation((dto) => {
              if (dto.currency === 'TWD') {
                return { ...dto };
              } else {
                return { ...dto, currency: 'TWD', price: (Number(dto.price) * 31).toString() }
              }
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  describe('createOrder', () => {
    it('應該創建一個台幣計價訂單並返回正確的消息', () => {
      const createOrderDto: CreateOrderDto = {
        id: "A0000001",
        name: "Melody Holiday Inn",
        address: {
          city: "taipei-city",
          district: "da-an-district",
          street: "fuxing-south-road"
        },
        price: "1990",
        currency: "TWD"
      };
      const result = controller.createOrder(createOrderDto);

      expect(service.transform).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual({
        message: '有效的訂單格式',
        order: createOrderDto,
      });
    });

    it('應該創建一個美金計價訂單並返回正確的消息', () => {
      const createOrderDto: CreateOrderDto = {
        id: "A0000001",
        name: "Melody Holiday Inn",
        address: {
          city: "taipei-city",
          district: "da-an-district",
          street: "fuxing-south-road"
        },
        price: "100",
        currency: "USD"
      };
      const result = controller.createOrder(createOrderDto);

      expect(service.transform).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual({
        message: '有效的訂單格式',
        order: {...createOrderDto, price: "3100", currency: 'TWD' },
      });
    });
  });
});